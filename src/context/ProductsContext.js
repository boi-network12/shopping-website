import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/config";
import { AuthContext } from "./AuthContext";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/product/all`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Create a new product (Admin only)
    const createProduct = async (productData) => {
        if (!user || user.role !== "admin") {
            toast.error("Access denied. Admins only.");
            return;
        }
    
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            console.log("Sending request to:", `${API_URL}/product/create`);
            console.log("Product Data:", productData);
    
            const response = await fetch(`${API_URL}/product/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
    
            const data = await response.json();
            console.log("Server Response:", data);
    
            if (response.ok) {
                setProducts([...products, data.product]);
                toast.success("Product created successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error creating product", error);
            toast.error("An error occurred while creating the product.");
        } finally {
            setLoading(false);
        }
    };
    

    // Edit a product (Admin only)
    const editProduct = async (productId, updatedData) => {
        if (!user || user.role !== "admin") {
            toast.error("Access denied. Admins only.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/product/edit/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            if (response.ok) {
                setProducts(products.map((p) => (p._id === productId ? { ...p, ...updatedData } : p)));
                toast.success("Product updated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating product", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a product (Admin only)
    const deleteProduct = async (productId) => {
        if (!user || user.role !== "admin") {
            toast.error("Access denied. Admins only.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/product/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setProducts(products.filter((p) => p._id !== productId));
                toast.success("Product deleted successfully");
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
                fetchProducts,
                createProduct,
                editProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
