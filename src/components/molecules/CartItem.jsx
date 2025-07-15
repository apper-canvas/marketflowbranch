import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CartItem = ({ item, product, onUpdateQuantity, onRemove, onSaveForLater }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex gap-4">
        <Link to={`/product/${product.Id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
          />
        </Link>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/product/${product.Id}`}>
              <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <button
              onClick={() => onRemove(item.productId)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <ApperIcon name="Minus" size={14} />
                </button>
                <span className="px-4 py-1.5 border-x border-gray-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="Plus" size={14} />
                </button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveForLater(item.productId)}
              >
                Save for later
              </Button>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${((product.discountPrice || product.price) * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                ${product.discountPrice || product.price} each
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;