import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
  isOpen,
  onClose
}) => {
  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 to $50", min: 25, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "$100 to $200", min: 100, max: 200 },
    { label: "$200 & Above", min: 200, max: 9999 }
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 z-50 lg:z-0 lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Clear Filters */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-primary hover:text-accent"
            >
              Clear all
            </Button>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ""}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-2"
                />
                All Categories
              </label>
              {categories.map(category => (
                <label key={category.Id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.Id}
                    checked={selectedCategory === category.Id}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price</h4>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={`${range.min}-${range.max}`}
                    checked={priceRange.min === range.min && priceRange.max === range.max}
                    onChange={() => onPriceChange(range.min, range.max)}
                    className="mr-2"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
          
          {/* Rating */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
            <div className="space-y-2">
              {ratings.map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={(e) => onRatingChange(parseInt(e.target.value))}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <ApperIcon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                      <ApperIcon key={i} name="Star" size={14} className="text-gray-300 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;