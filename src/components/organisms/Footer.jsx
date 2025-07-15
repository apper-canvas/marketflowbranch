import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="ShoppingBag" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold font-display">MarketFlow</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted online marketplace for quality products at great prices. 
              Fast shipping, excellent customer service, and satisfaction guaranteed.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2 text-sm">
              <Link to="/help" className="block text-gray-400 hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/returns" className="block text-gray-400 hover:text-primary transition-colors">
                Returns & Exchanges
              </Link>
              <Link to="/shipping" className="block text-gray-400 hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/track" className="block text-gray-400 hover:text-primary transition-colors">
                Track Your Order
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/deals" className="block text-gray-400 hover:text-primary transition-colors">
                Today's Deals
              </Link>
              <Link to="/categories" className="block text-gray-400 hover:text-primary transition-colors">
                All Categories
              </Link>
              <Link to="/bestsellers" className="block text-gray-400 hover:text-primary transition-colors">
                Best Sellers
              </Link>
              <Link to="/new-arrivals" className="block text-gray-400 hover:text-primary transition-colors">
                New Arrivals
              </Link>
              <Link to="/gift-cards" className="block text-gray-400 hover:text-primary transition-colors">
                Gift Cards
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About MarketFlow</h3>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-gray-400 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/careers" className="block text-gray-400 hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="block text-gray-400 hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MarketFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-4">
                <ApperIcon name="CreditCard" size={20} className="text-gray-400" />
                <ApperIcon name="Smartphone" size={20} className="text-gray-400" />
                <ApperIcon name="Shield" size={20} className="text-gray-400" />
                <ApperIcon name="Truck" size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;