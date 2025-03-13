import React, { useContext, useEffect, useState } from 'react';
import "./Products.css";
import { BiTrash, BiPlusCircle } from "react-icons/bi";
import { AuthContext } from '../../context/AuthContext';
import { ProductsContext } from '../../context/ProductsContext';
import { CategoriesPost } from '../../constant/CategoriesList';
import moment from "moment"; 
import LoadingDots from '../../Loading/LoadingDots ';

const colors = ["Red", "Black", "White", "Blue"];
const sizes = ["Small", "Medium", "Large"];

const Products = () => {
    const { user } = useContext(AuthContext);
    const { products, fetchProducts, createProduct, deleteProduct } = useContext(ProductsContext);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ 
        productName: "",  
        price: "", 
        category: [],  
        description: "", 
        image: "",
        color: "", 
        size: "" 
    });


    

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
        setNewProduct({ ...newProduct, category: selectedCategories });
    };

    
    const handleDelete = async (id) => {
        if (!user) return alert("You must be logged in to delete a product.");
        await deleteProduct(id);
    };

    if (loading) {
        return <LoadingDots/>
    }

    const handleAddProduct = async () => {
        if (!user) return alert("You must be logged in to add a product.");
        
        console.log("New Product Data:", newProduct);
    
        if (!newProduct.productName || !newProduct.price || newProduct.category.length === 0 || !newProduct.description) {
            return;
        }
        try {
            setLoading(true)
            // 1. Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", newProduct.image);
            formData.append("upload_preset", "ml_default"); // Use your Cloudinary preset
    
            const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dypgxulgp/image/upload", {
                method: "POST",
                body: formData
            });
    
            const cloudinaryData = await cloudinaryResponse.json();
            if (!cloudinaryData.secure_url) throw new Error("Image upload failed");
    
            // 2. Send product data to backend with Cloudinary image URL
            const productData = {
                ...newProduct,
                image: cloudinaryData.secure_url, // Cloudinary image URL
            };
    
            await createProduct(productData);
    
            // Reset form after submission
            setNewProduct({ productName: "", price: "", category: [], description: "", image: "", color: "", size: "" });
            setShowModal(false);
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Failed to upload product. Try again.");
        }  finally{
            setLoading(false)
        }
    };
    

    return (
        <div className="products-container">
            <div className="header">
                <h2 className="products-title">Products</h2>
                <button className="add-product-btn" onClick={() => setShowModal(true)} disabled={!user}>
                    <BiPlusCircle className="icon1" /> Add Product
                </button>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date Added</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id || index}>
                            <td>{product.productName}</td>
                            <td>NGN {new Intl.NumberFormat().format(product.price)}</td>
                            <td>{String(product.category)?.length > 2 ? String(product.category).substring(0, 2) + "..." : String(product.category)}</td>
                            <td>{moment(product.createdAt).format("MMMM Do YYYY, h:mm a")}</td>
                            <td>
                                {user && <BiTrash className="delete-icon" onClick={() => handleDelete(product._id)} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add Product</h3>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.productName}
                            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        
                        <div className="category-dropdown">
                            <div className="dropdown-header" onClick={toggleDropdown}>
                                {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select Categories"}
                            </div>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    {CategoriesPost.map((category) => (
                                        <div key={category} className="dropdown-item" onClick={() => handleCategorySelect(category)}>
                                            {category}
                                            <input type="checkbox" checked={selectedCategories.includes(category)} readOnly />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        ></textarea>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                        />
                        <select value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}>
                            {colors.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>
                        <select value={newProduct.size} onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}>
                            {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>

                        <button className="custom-submit-btn" onClick={handleAddProduct}>{loading ? "Loading" : "Submit"}</button>

                        <button className="custom-close-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
