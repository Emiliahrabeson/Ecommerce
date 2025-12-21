import { MapPin } from "lucide-react";
import apiService from "../services";
import { useEffect, useState } from "react";

export const PopularCitiesTab = () => {
  const [popularCities, setPopularCities] = useState([]);
  const [_, setLoading] = useState(false);
  const [__, setError] = useState(null);

  useEffect(() => {
    const fetchPopularCities = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.get("/popularCity");

        console.log(" data popular City :", data);
        setPopularCities(data);
      } catch (err) {
        console.error("Error fetching popular City:", err);
        setError(err.message || "Failed to load popular city");
      } finally {
        setLoading(false);
      }
    };
    fetchPopularCities();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularCities.map((city, index) => (
        <div
          key={city.city}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold mb-2">{city.city}</h3>
            <p className="text-gray-600 mb-4">With clients : </p>
            <p className="text-4xl font-bold text-blue-600 mb-2">{city.c}</p>
            <p className="text-gray-600 mb-4">Orders :</p>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {index + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
