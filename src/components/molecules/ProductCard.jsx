import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/atoms/StarRating";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/product/${product.Id}`}>
        <div className="relative overflow-hidden">
          {imageError ? (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300">
              <div className="text-center">
                <ApperIcon name="Package" size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Product Image</p>
              </div>
            </div>
          ) : (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="w-full h-48 bg-gray-200 animate-pulse rounded"></div>
                </div>
              )}
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          )}
          {product.isPrime && (
            <div className="absolute top-2 left-2">
              <Badge variant="prime" size="sm">
                <ApperIcon name="Zap" size={12} className="mr-1" />
                Prime
              </Badge>
            </div>
          )}
          {product.discountPrice && (
            <div className="absolute top-2 right-2">
              <Badge variant="error" size="sm">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} size={14} showNumber={false} />
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full text-sm"
            disabled={!product.inStock}
          >
            <ApperIcon name="ShoppingCart" size={14} className="mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;