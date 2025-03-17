import React, { useContext, useEffect, useState } from 'react';
import { FaBoxOpen } from "react-icons/fa";
import "./Pagination.css";
import { AuthContext } from '../../context/AuthContext';
import { ProductsContext } from '../../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import Auth from '../../auth/Auth';
import ProductsDetails from '../../Modal/ProductsDetails';
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi"

const Pagination = ({ selectedCategory, searchQuery  }) => {
  const { user } = useContext(AuthContext);
  const { fetchProducts, products } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show only 4 products per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let updatedProducts = products;

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(product =>
        product.category.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, searchQuery]);

  // Total number of pages
  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page navigation
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
      navigate(`/products-details/${product._id}`, { state: { product } });
    } else {
      setIsAuthModalOpen(true);
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
              <p className="price">₦{new Intl.NumberFormat().format(product.price)}</p>
              <button className="select-button" onClick={() => setIsProductModalOpen(true)}>
                Select Options
              </button>
            </div>
          ))}
        </div>
      )}

      {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)} />}
      {isProductModalOpen && <ProductsDetails onClose={() => setIsProductModalOpen(false)} product={products} />}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <BiArrowToLeft/>
          </button>
          <span> {currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
             <BiArrowToRight/>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
