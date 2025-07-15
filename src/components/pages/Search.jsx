import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesQuery = query ? product.title.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = (product.discountPrice || product.price) >= priceRange.min && 
                        (product.discountPrice || product.price) <= priceRange.max;
    const matchesRating = selectedRating ? product.rating >= selectedRating : true;
    
    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.Id - a.Id;
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 9999 });
    setSelectedRating(0);
    setSortBy("relevance");
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              {query ? `Search results for "${query}"` : "All Products"}
            </h1>
            <p className="text-gray-600 mt-1">
              {sortedProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ApperIcon name="Filter" size={16} />
              Filters
            </button>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            onClearFilters={handleClearFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={sortedProducts}
              loading={loading}
              error={error}
              onRetry={loadData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;