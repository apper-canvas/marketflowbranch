import React from "react";
import ApperIcon from "@/components/ApperIcon";

const StarRating = ({ rating = 0, maxRating = 5, size = 16, showNumber = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, index) => (
          <ApperIcon
            key={`full-${index}`}
            name="Star"
            size={size}
            className="text-yellow-400 fill-current"
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <ApperIcon
              name="Star"
              size={size}
              className="text-gray-300 fill-current"
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <ApperIcon
                name="Star"
                size={size}
                className="text-yellow-400 fill-current"
              />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <ApperIcon
            key={`empty-${index}`}
            name="Star"
            size={size}
            className="text-gray-300 fill-current"
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;