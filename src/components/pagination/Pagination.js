import React, { useContext, useEffect, useState } from 'react';
import "./Pagination.css";
import { AuthContext } from '../../context/AuthContext';
import { ProductsContext } from '../../context/ProductsContext';

const Pagination = () => {
  const { user } = useContext(AuthContext);
  const { fetchProducts, products } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Calculate total pages
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  // Get current page products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="pagination-wrapper">
      <div className="products-grid">
        {currentProducts?.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p className="price">₦{product.price}</p>
            <button className="select-button">Select Options</button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
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
