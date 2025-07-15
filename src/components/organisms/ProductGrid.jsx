import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const ProductGrid = ({ products, loading, error, onRetry }) => {
  const { addToCart } = useCart();

  if (loading) {
    return <Loading type="products" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        title="No products found"
        message="We couldn't find any products matching your criteria. Try adjusting your search or browse our categories."
        actionText="Browse All Categories"
        onAction={() => window.location.href = "/"}
        icon="Package"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {products.map(product => (
        <ProductCard
          key={product.Id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;