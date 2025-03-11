import React, { useState } from 'react';
import "./Products.css";
import { BiTrash, BiPlusCircle } from "react-icons/bi";

const initialProducts = [
    { id: 1, name: "Smartphone", price: "$699", category: "Electronics", dateAdded: "2024-03-08" },
    { id: 2, name: "Gaming Laptop", price: "$1299", category: "Computers", dateAdded: "2024-03-07" },
    { id: 3, name: "Wireless Headphones", price: "$199", category: "Accessories", dateAdded: "2024-03-06" },
];

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price && newProduct.category) {
            const newId = products.length ? products[products.length - 1].id + 1 : 1;
            setProducts([...products, { id: newId, ...newProduct, dateAdded: new Date().toISOString().split('T')[0] }]);
            setNewProduct({ name: "", price: "", category: "" });
            setShowModal(false);
        }
    };

    return (
        <div className="products-container">
            <div className="header">
                <h2 className="products-title">Products</h2>
                <button className="add-product-btn" onClick={() => setShowModal(true)}>
                    <BiPlusCircle className="icon" /> Add Product
                </button>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date Added</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.dateAdded}</td>
                            <td>
                                <BiTrash className="delete-icon" onClick={() => handleDelete(product.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add Product</h3>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />
                        <button className="submit-btn" onClick={handleAddProduct}>Add</button>
                        <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
