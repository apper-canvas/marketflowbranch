import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ variant = "default", size = "md", children, className, ...props }) => {
  const baseStyles = "inline-flex items-center font-semibold rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-accent text-white",
    secondary: "bg-gradient-to-r from-secondary to-blue-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
    error: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    prime: "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;