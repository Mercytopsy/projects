import React from 'react';
import ReactDOM from 'react-dom';


class ProductDashboard extends React.Component {
	state = {
		products: []
	}

	componentDidMount() {
		fetch('http://localhost:8000/all')
			.then(response => response.json())
			.then(data => {
				this.setState({products: data});
			})
	}

	createNewProduct= (product) => {
		fetch('http://localhost:8000/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		}).then(response => response.json())
		.then(book => {
			this.setState({products: this.state.products.concat([product])});
		});
	}

	updateProduct = (newProduct) => {
		fetch(`http://localhost:8000/update/${newProduct.id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		}).then(response => response.json())
		.then(newProduct => {
			const newProduct = this.state.products.map(product => {
				if(product.id === newProduct.id) {
					return Object.assign({}, newProduct)
				} else {
					return product;
				}
			});
			this.setState({products: newProduct});
		});
	}

	deleteProduct = (productId) => {
		fetch(`http://localhost:8000/remove/${bookId}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(() => {
			this.setState({products: this.state.products.filter(product => product.id !== productId)})
		});

	}
	render() {
		return (
			<main className="d-flex justify-content-center my-4">
				<div  className="col-5">
					<ProductList
						products={this.state.products}
						onDeleteClick={this.deleteProduct}
						onUpdateClick={this.updateProduct}
					/>
					<ToggleableProductForm
						onBookCreate={this.createNewProduct}
					/>
				</div>
			</main>
		)
	}
}

class ProductList extends React.Component {
	render() {
		const products = this.props.products.map(product => (
			<EditableProduct
				key={product.id}
				product_name={product.product_name}
				product_type={product.product_type}
				price={product.price}
                product_description={product.product_description}
				onDeleteClick={this.props.onDeleteClick}
				onUpdateClick={this.props.onUpdateClick}

			></EditableProduct>
		));

		return (
			<div>
				{products}
			</div>
		);
	}
}

class ToggleableProductForm extends React.Component {
	state = {
		inCreateMode: false
	}
	handleCreateClick = () => {
		this.setState({inCreateMode: true});
	}
	leaveCreateMode = () => {
		this.setState({inCreateMode: false});
	}
	handleCancleClick = () => {
		this.leaveCreateMode();
	}
	handleFormSubmit = (product) => {
		this.leaveCreateMode();
		this.props.onBookCreate(product);
	}
	render() {
		if (this.state.inCreateMode) {
			return (
				<div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
					<ProductForm 
						onFormSubmit={this.handleFormSubmit}
						onCancelClick={this.handleCancleClick}></ProductForm>
				</div>
				
			)
		}
		return (
			<button onClick={this.handleCreateClick} className="btn btn-secondary">
				<i className="fas fa-plus"></i>
			</button>
		);
	}
}

class ProductForm extends React.Component {
	state = {
		product_name: this.props.product_name|| '',
        product_type: this.props.product_type || '',
        price: this.props.price || '',
        product_description: this.props. product_description || ''
	}

	handleFormSubmit = (evt) => {
		evt.preventDefault();
		this.props.onFormSubmit({...this.state});
	}
	handleNameUpdate = (evt) => {
		this.setState({product_name: evt.target.value});
    }
    handleTypeUpdate = (evt) => {
		this.setState({product_type: evt.target.value});
	}
	handlePriceUpdate = (evt) => {
		this.setState({price: evt.target.value});
	}
    handleDescriptionUpdate = (evt) => {
		this.setState({product_description: evt.target.value});
	}
    

	render() {
		const buttonText = this.props.id ? 'Update Product': 'Create Product';
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className="form-group">
					<label>
						Product_Name
					</label>
					<input type="text" placeholder="Enter product name"
						value={this.state.product_name} onChange={this.handleNameUpdate}
						className="form-control"
					/>
				</div>

                <div className="form-group">
					<label>
						Product_Type
					</label>
					<input type="text" placeholder="Enter product type"
						value={this.state.product_type} onChange={this.handleTypeUpdate}
						className="form-control"
					/>
				</div>

                <div className="form-group">
					<label>
						Price
					</label>
					<input type="text" placeholder="Enter price"
						value={this.state.price} onChange={this.handlePriceUpdate}
						className="form-control"
					/>
				</div>
				
				<div className="form-group">
					<label>
						Description
					</label>
					<textarea className="form-control" placeholder="Product Description"
						rows="5" value={this.state.product_description}
						onChange={this.handleDescriptionUpdate}
					>
						{this.state.product_description}
					</textarea>
				</div>

				<div className="form-group d-flex justify-content-between">
					<button type="submit" className="btn btn-md btn-primary">
						{buttonText}
					</button>
					<button type="button" className="btn btn-md btn-secondary" onClick={this.props.onCancelClick}>
						Cancel
					</button>
				</div>
			</form>
		)
	}
}

class EditableProduct extends React.Component {
	state = {
		inEditMode: false
	};

	enterEditMode = () => {
		this.setState({inEditMode: true});
	}

	leaveEditMode = () => {
		this.setState({inEditMode: false});
	}
	handleDelete = () => {
		this.props.onDeleteClick(this.props.id);
	}
	handleUpdate = (product) => {
		this.leaveEditMode()
		product.id = this.props.id;
		this.props.onUpdateClick(product);
	}

	render() {
		const component = () => {
			if(this.state.inEditMode) {
				return (
					<ProductForm 
						product_name={this.props.product_name}
						product_type={this.props.product_type}
                        price={this.props.price}
                        product_description={this.props.product_description}
						onCancelClick={this.leaveEditMode}
						onFormSubmit={this.handleUpdate}
					/>
				);
			} 
			return (
				<Product 
                product_name={this.props.product_name}
                product_type={this.props.product_type}
                price={this.props.price}
                product_description={this.props.product_description}
					onEditClick={this.enterEditMode}
					onDeleteClick={this.handleDelete}
				/>
			)
		}
		return (
			<div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
				{component()}
			</div>
		)
	}
}

class Product extends React.Component {
	render() {
		return (
			<div className="card" /* style="width: 18rem;" */>
				<div className="card-header d-flex justify-content-between">
					<span>
						<strong>Product_name: </strong>{this.props.product_name}
					</span>
					<div>
						<span onClick={this.props.onEditClick} className="mr-2"><i className="far fa-edit"></i></span>
						<span onClick={this.props.onDeleteClick}><i className="fas fa-trash"></i></span>
					</div>

				</div>
				<div className="card-body">
					{this.props.product_description}
				</div>
				<div className="card-footer">
					<strong>Product_Type:</strong>  {this.props.product_type}
				</div>
			</div>
		);
	}
}
ReactDOM.render(<ProductDashboard />, document.getElementById('root'));