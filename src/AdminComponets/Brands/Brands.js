import React, { useState } from "react";
import "./Brands.css";
import { BiTrash, BiPlusCircle } from "react-icons/bi";

const initialBrands = [
  { id: 1, name: "Apple", category: "Electronics", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", dateAdded: "2024-03-08" },
  { id: 2, name: "Nike", category: "Fashion", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", dateAdded: "2024-03-07" },
  { id: 3, name: "Samsung", category: "Electronics", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", dateAdded: "2024-03-06" },
];

const Brands = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [showModal, setShowModal] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", category: "", logo: "" });

  const handleDelete = (id) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  const handleAddBrand = () => {
    if (newBrand.name && newBrand.category && newBrand.logo) {
      const newId = brands.length ? brands[brands.length - 1].id + 1 : 1;
      setBrands([...brands, { id: newId, ...newBrand, dateAdded: new Date().toISOString().split("T")[0] }]);
      setNewBrand({ name: "", category: "", logo: "" });
      setShowModal(false);
    }
  };

  return (
    <div className="brands-container">
      <div className="header">
        <h2 className="brands-title">Brands</h2>
        <button className="add-brand-btn" onClick={() => setShowModal(true)}>
          <BiPlusCircle className="icon" /> Add Brand
        </button>
      </div>

      <table className="brands-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Date Added</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </td>
              <td>{brand.name}</td>
              <td>{brand.category}</td>
              <td>{brand.dateAdded}</td>
              <td>
                <BiTrash className="delete-icon" onClick={() => handleDelete(brand.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Brand</h3>
            <input
              type="text"
              placeholder="Brand Name"
              value={newBrand.name}
              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newBrand.category}
              onChange={(e) => setNewBrand({ ...newBrand, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Logo URL"
              value={newBrand.logo}
              onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
            />
            <button className="submit-btn" onClick={handleAddBrand}>Add</button>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
