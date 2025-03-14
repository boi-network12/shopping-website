import React, { useContext, useEffect, useState } from 'react';
import { FaBoxOpen } from "react-icons/fa";
import "./Pagination.css";
import { AuthContext } from '../../context/AuthContext';
import { ProductsContext } from '../../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import Auth from '../../auth/Auth';
import ProductsDetails from '../../Modal/ProductsDetails';

const Pagination = () => {
  const { user } = useContext(AuthContext);
  const { fetchProducts, products } = useContext(ProductsContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Calculate total pages
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  // Get current page products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstItem, indexOfLastItem) : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleFullDetails = (product) => {
    if (user) {
      navigate(`/products-details/${product._id}`, { state: { product }});
    } else {
      setIsAuthModalOpen(true)
    }
  };
  
  return (
    <div className="pagination-wrapper">
      {currentProducts.length === 0 ? (
        <div className="no-products">
          <FaBoxOpen className="no-products-icon" />
          <p>No products available</p>
        </div>
      ) : (
        <div className="products-grid">
          {currentProducts.map((product, index) => (
            <div key={index} className="product-card" onClick={() => handleFullDetails(product)}>
              <img src={product.image} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p className="price">₦{product.price}</p>
              <button className="select-button" onClick={() => setIsProductModalOpen(true)}>
                Select Options
              </button>
            </div>
          ))}
        </div>
      )}

      {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)}/>}
      {isProductModalOpen && <ProductsDetails onClose={() => setIsProductModalOpen(false)} product={products} />}

      {totalPages > 1 && products.length > 4 && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>&larr;</button>
          <span>{currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>&rarr;</button>
        </div>
      )}
      
    </div>
  );
};

export default Pagination;
