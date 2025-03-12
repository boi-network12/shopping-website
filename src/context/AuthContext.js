import React, { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/config";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await fetch(`${API_URL}/auth/me`, {
                        method: "GET",
                        headers: {
                            "Authorization" : `Bearer ${token}`
                        }
                    });

                    const data = await response.json();
                    if (data){
                        setUser(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching user details", error);
            } finally {
                setLoading(false);
            }
        }

        getCurrentUser()
    },[])

    const register = async (name, email, country, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, country, password})
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed")

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user);

            toast.success("Registration successful!")
            return { success: true, user: data.user }

        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    }

    const login = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.info("Logged out successfully");
    }

    const updateUserInfo = async (userData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/auth/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Update failed");

            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

            toast.success("User updated successfully!");
            return { success: true, user: data.user };
        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    }

    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/auth/delete-account`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Delete failed");

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);

            toast.success("Account deleted successfully!");
            return { success: true };
        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    };

    const getAllUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/auth/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch users");

            return { success: true, users: data };
        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setLoading,
                register,
                login,
                logout,
                updateUserInfo,
                deleteAccount,
                getAllUsers,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}