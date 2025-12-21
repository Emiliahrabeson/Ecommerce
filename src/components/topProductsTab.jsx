import apiService from "../services";
import { useEffect, useState } from "react";

export const TopProductsTab = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.get("/topProducts", {
          limit: 10,
          offset: 0,
        });

        console.log("TopProducts data:", data);
        setTopProducts(data);
      } catch (error) {
        console.error("Error fetching top products:", error);
        setTopProducts([]);
        // console.log("top Products :", TopProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 mt-2">Loading top products...</p>
      </div>
    );
  }

  if (topProducts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No top products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {topProducts.map((product, index) => (
        <div
          key={product.product_id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl font-bold text-gray-300">{index + 1}</div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold">
                  {product.product_name}
                </h3>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  {parseFloat(product.rating || 0).toFixed(1)}
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${parseFloat(product.price || 0).toFixed(2)}
              </div>
              {/* {onProductClick && (
                <button
                  onClick={() => onProductClick(product)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
              )} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
