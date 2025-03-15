import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Auth from '../../auth/Auth';
import CatDisplay from '../../components/CatDisplay/CatDisplay';
import Footer from '../../components/Footer/Footer';
import './ProductsPage.css';
import { toast } from 'react-toastify';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCatModelOpen, setIsCatModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(""); 
  const [selectedSize, setSelectedSize] = useState("");   
  const [ setSearchQuery] = useState(false);
  

  // Redirect if product data is missing
  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);


  if (!product) {
    return null;
  }

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select color and size!');
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Create a unique identifier based on product ID, selected color, and size
    const uniqueId = `${product._id}`;
  
    const existingProductIndex = cart.findIndex(item => item.uniqueId === uniqueId);
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ 
        ...product, 
        quantity, 
        selectedColor, 
        selectedSize, 
        uniqueId // Store unique identifier to differentiate products
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Product added to cart!');
  };
  

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  

  return (
    <div className='productsPage-container'>
      <Header 
         setIsAuthModalOpen={setIsAuthModalOpen} 
         setIsCatModalOpen={setIsCatModalOpen} 
         setSearchQuery={setSearchQuery}
          />
      
      <div className='productsPage-wrapper'>
        <div className='productPage-image' >
          <img src={product.image} alt={product.productName} />
        </div>
        <div className='product-details'>
          <h2>{product.productName}</h2>
          <p className='price'>₦ {new Intl.NumberFormat().format(product.price)}</p>
          <h3 className='pDis'>Product Description</h3>
          <p className='TextPDis'>{product.description}</p>

          <div className="selectors">
          <div className="selector">
            <label>Color</label>
            <select value={selectedColor} onChange={handleColorChange}>
              <option value="">Select Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className="selector">
            <label>Size</label>
            <select value={selectedSize} onChange={handleSizeChange}>
              <option value="">Select Size</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">l</option>
              <option value="Xl">Xl</option>
            </select>
          </div>
        </div>


          <div className='Add-minus'>
            <button onClick={handleDecrease} disabled={quantity === 1}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={handleIncrease}>+</button>
          </div>

          <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)} />}
      {isCatModelOpen && <CatDisplay onClose={() => setIsCatModalOpen(false)} />}
      
      <Footer />
    </div>
  );
};

export default ProductsPage;