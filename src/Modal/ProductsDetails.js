import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ProductsDetails = ({ product }) => {
    // Redirect if product data is missing
      const [quantity, setQuantity] = useState(1);
      const [selectedColor, setSelectedColor] = useState(""); 
      const [selectedSize, setSelectedSize] = useState("");   

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
      const uniqueId = `${product.id}-${selectedColor}-${selectedSize}`;
    
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
      
      <div className='productsPage-wrapper'>
        <div className='productPage-image'>
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
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
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
    </div>
  )
}

export default ProductsDetails