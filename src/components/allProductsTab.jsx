import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "./ui/searchBar";
import apiService from "../services";

export const AllProductsTab = ({ products, onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    const filterProducts = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const data = await apiService.get("/searchProducts", {
        limit: itemsPerPage,
        offset: offset,
        search: searchTerm,
      });
      // Handle case where API might return { products, total } or just products array
      const productsList = Array.isArray(data) ? data : data.products || [];
      setFilteredProducts(productsList);
    };
    filterProducts();
  }, [searchTerm, currentPage]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
      />

      <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Sales
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">{product.stock}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onProductClick(product)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="flex items-center px-4 font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={filteredProducts.length < itemsPerPage}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
