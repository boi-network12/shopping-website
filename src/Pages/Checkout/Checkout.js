import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroBg from '../../components/HeroBg/HeroBg';
import Header from '../../components/Header/Header';
import Auth from '../../auth/Auth';
import CatDisplay from '../../components/CatDisplay/CatDisplay';
import Footer from '../../components/Footer/Footer';
import ShoppingDetails from '../../components/ShoppingDetails/ShoppingDetails';
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
      const [isCatModelOpen, setIsCatModalOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
      const { user } = useContext(AuthContext);
      const { createOrder } = useContext(OrderContext)
    
    
    // Use useMemo to avoid unnecessary re-renders
    const cartItems = useMemo(() => 
        Array.isArray(location.state?.cartItems) ? location.state.cartItems : [],
        [location.state?.cartItems]
    );

    useEffect(() => {
        if (!cartItems.length) { 
            navigate('/');
        }
    }, [cartItems.length, navigate]);
    

    if (!cartItems.length) {
        return null;
    }

    return (
        <div className='HomeWrapper'>
            <Header
                setIsAuthModalOpen={setIsAuthModalOpen} 
                setIsCatModalOpen={setIsCatModalOpen} 
                setSearchQuery={setSearchQuery}
            />
            <section style={{ width: "100%" }}>
                <HeroBg/>
            </section>
            <main style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShoppingDetails 
                   cartItems={cartItems} 
                   searchQuery={searchQuery} 
                   user={user}
                   createOrder={createOrder}
                 />
            </main>

            <Footer/>
            {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)} />}
            {isCatModelOpen && <CatDisplay onClose={() => setIsCatModalOpen(false)} />}
        </div>
    )
};

export default Checkout;
