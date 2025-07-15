import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { orderService } from "@/services/api/orderService";
import { productService } from "@/services/api/productService";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, productsData] = await Promise.all([
        orderService.getAll(),
        productService.getAll()
      ]);
      
      setOrders(ordersData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Error message={error} onRetry={loadData} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Empty
            title="No orders yet"
            message="You haven't placed any orders yet. Start shopping to see your orders here."
            actionText="Start Shopping"
            onAction={() => window.location.href = "/"}
            icon="Package"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              Your Orders
            </h1>
            <p className="text-gray-600 mt-2">
              Track and manage your orders
            </p>
          </div>
          <Link to="/">
            <Badge variant="primary" className="px-4 py-2">
              <ApperIcon name="Plus" size={14} className="mr-1" />
              Shop More
            </Badge>
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order #{order.Id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {format(new Date(order.orderDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map(item => {
                    const product = products.find(p => p.Id === item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                            {product.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        +{order.items.length - 3} more items
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/order-confirmation/${order.Id}`}
                      className="text-primary hover:text-accent font-medium text-sm transition-colors"
                    >
                      View Details
                    </Link>
                    {order.status === "delivered" && (
                      <button className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors">
                        Leave Review
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {order.status === "confirmed" && (
                      <Badge variant="warning" size="sm">
                        <ApperIcon name="Clock" size={12} className="mr-1" />
                        Processing
                      </Badge>
                    )}
                    {order.status === "shipped" && (
                      <Badge variant="primary" size="sm">
                        <ApperIcon name="Truck" size={12} className="mr-1" />
                        In Transit
                      </Badge>
                    )}
                    {order.status === "delivered" && (
                      <Badge variant="success" size="sm">
                        <ApperIcon name="CheckCircle" size={12} className="mr-1" />
                        Delivered
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;