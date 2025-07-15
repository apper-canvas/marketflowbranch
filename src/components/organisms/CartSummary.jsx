import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CartSummary = ({ items, products }) => {
  const navigate = useNavigate();

  const subtotal = items.reduce((total, item) => {
    const product = products.find(p => p.Id === item.productId);
    if (product) {
      return total + (product.discountPrice || product.price) * item.quantity;
    }
    return total;
  }, 0);

  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="gradient-text">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {shipping > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700">
            <ApperIcon name="Truck" size={14} className="inline mr-1" />
            Add ${(35 - subtotal).toFixed(2)} more for FREE shipping
          </p>
        </div>
      )}
      
      <Button
        onClick={() => navigate("/checkout")}
        className="w-full mb-3"
        disabled={items.length === 0}
      >
        <ApperIcon name="CreditCard" size={16} className="mr-2" />
        Proceed to Checkout
      </Button>
      
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="w-full"
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default CartSummary;