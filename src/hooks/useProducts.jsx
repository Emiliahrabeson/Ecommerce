import { useEffect, useState } from "react";
import apiService from "../services";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.get("/allProducts", {
          limit: 100,
          offset: 0,
        });

        // console.log(" data tab tab:", data);

        // const flattenedData = Array.isArray(data) ? data.flat() : [];

        // console.log("Flattened products:", flattenedData);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
