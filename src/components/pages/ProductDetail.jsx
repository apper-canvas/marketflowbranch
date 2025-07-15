import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ProductDetails from "@/components/organisms/ProductDetails";
import { productService } from "@/services/api/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await productService.getById(parseInt(id));
      if (!productData) {
        setError("Product not found");
        return;
      }
      
      setProduct(productData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return <Loading type="product-detail" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Error 
          message={error} 
          onRetry={loadProduct}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Error 
          message="Product not found" 
          onRetry={() => navigate(-1)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetail;