import React, { useEffect, useState } from "react";
import "./Categories.css";
import { CategoriesList } from "../../constant/CategoriesList";

const Categories = ({ setSelectedCategory }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSelectedCategory(category); // Update selected category in Home
    setShowDropdown(false);
  };

  return (
    <div className="CatContainer">
      <div className="CategoriesWrapper">
        {!isMobile ? (
          <div className="BiggerSizeCat">
            <p
              className={activeCategory === "All" ? "active" : ""}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </p>
            {CategoriesList.map((category, index) => (
              <p
                key={index}
                className={activeCategory === category.label ? "active" : ""}
                onClick={() => handleCategoryClick(category.label)}
              >
                {category.label}
              </p>
            ))}
          </div>
        ) : (
          <div className="MobileDropdown">
            <div
              className="DropdownHeader"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p>{activeCategory}</p>
              <span className={`arrow ${showDropdown ? "open" : ""}`}>&#9662;</span>
            </div>
            {showDropdown && (
              <div className="DropdownMenu">
                {["All", ...CategoriesList.map((cat) => cat.label)].map(
                  (category, index) => (
                    <p key={index} onClick={() => handleCategoryClick(category)}>
                      {category}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
