import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  message = "Try adjusting your search or browse our categories",
  actionText = "Browse Categories",
  onAction,
  icon = "Search"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:from-accent hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;