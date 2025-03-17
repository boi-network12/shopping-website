import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Auth from "../../auth/Auth";
import { BiBox, BiLogOut, BiStar, BiUserCircle } from "react-icons/bi";
import AccountDetails from "../../components/AccountDetails/AccountDetails";
import MyOrders from "../../components/MyOrders/MyOrders";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Transactions from "../../components/Transactions/Transactions";

const Profile = () => {
    const { logout } = useContext(AuthContext)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null); 
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        // Detect screen size change
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Handle back button in mobile view
        const handlePopState = () => {
            setActiveSection(null); // Show sidebar again
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (isMobileView) {
            window.history.pushState({}, "", "#section"); 
        }
    };

    const handleLogout = () => {
        navigate("/")
        logout();
    }

    return (
        <div className="profile-container">
            <Header setIsAuthModalOpen={setIsAuthModalOpen} setSearchQuery={setSearchQuery} />
            {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)} />}

            <div className="profile-content">
                {/* Sidebar Navigation */}
                {!isMobileView || activeSection === null ? (
                    <aside className="sidebar">
                        <ul>
                            <li 
                                className={activeSection === "account" ? "active" : ""} 
                                onClick={() => handleSectionChange("account")}
                            >
                                <BiUserCircle color="#148114" size={22} /> Account Details
                            </li>
                            <li 
                                className={activeSection === "orders" ? "active" : ""} 
                                onClick={() => handleSectionChange("orders")}
                            >
                                <BiBox color="#148114" size={22} /> My Orders
                            </li>
                            <li 
                                className={activeSection === "transactions" ? "active" : ""} 
                                onClick={() => handleSectionChange("transactions")}
                            >
                                <BiStar color="#148114" size={22} /> Transactions Reviews
                            </li>
                            <li className="logout"
                               onClick={handleLogout}
                            >
                                <BiLogOut color="red" size={22} /> Logout
                            </li>
                        </ul>
                    </aside>
                ) : null}

                {/* Main Content Area */}
                <main className="account-details">
                {activeSection === "account" && <AccountDetails />}
                    {activeSection === "orders" && <MyOrders searchQuery={searchQuery} />}
                    {activeSection === "transactions" && <Transactions searchQuery={searchQuery} />}
                </main>
            </div>
        </div>
    );
};

export default Profile;
