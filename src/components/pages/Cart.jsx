import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import CartItem from "@/components/molecules/CartItem";
import CartSummary from "@/components/organisms/CartSummary";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";
import { productService } from "@/services/api/productService";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, saveForLater } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productIds = cartItems.map(item => item.productId);
      const allProducts = await productService.getAll();
      const cartProducts = allProducts.filter(product => 
        productIds.includes(product.Id)
      );
      
      setProducts(cartProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [cartItems]);

  if (loading) {
    return <Loading type="cart" />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Empty
            title="Your cart is empty"
            message="Looks like you haven't added any items to your cart yet. Start shopping to find some great products!"
            actionText="Start Shopping"
            onAction={() => window.location.href = "/"}
            icon="ShoppingCart"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Shopping Cart
          </h1>
          <span className="text-lg text-gray-600">
            ({cartItems.length} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              const product = products.find(p => p.Id === item.productId);
              if (!product) return null;
              
              return (
                <CartItem
                  key={item.productId}
                  item={item}
                  product={product}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  onSaveForLater={saveForLater}
                />
              );
            })}
            
            {/* Continue Shopping Link */}
            <div className="pt-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                <ApperIcon name="ArrowLeft" size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div>
            <CartSummary items={cartItems} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;