import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "./ui/searchBar";
import apiService from "../services";
import { useEffect, useState } from "react";

export const ClientsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { results: clientsList, pagination } = await apiService.get(
          `/allClients?page=${currentPage}&search=${searchTerm}`
        );
        setClients(clientsList);
        setTotalItems(pagination.totalItems);
      } catch (error) {
        console.error("Failed to fetch clients", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  // Reset to page 1 when search changes
  const handleSearchChange = (term) => {
    // setTimeout(() => {
    setSearchTerm(term);
    // }, 400);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search clients name..."
      />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                City
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Orders
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Signup Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{client.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {client.city}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">{client.gender}</td>
                <td className="px-6 py-4 text-right font-bold text-green-600">
                  {client.signup_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* //footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {totalItems > itemsPerPage
              ? `Showing page ${currentPage} of ${Math.ceil(
                  totalItems / itemsPerPage
                )}`
              : `Showing page ${currentPage}`}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="flex items-center px-4 font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={clients.length < itemsPerPage || loading}
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
