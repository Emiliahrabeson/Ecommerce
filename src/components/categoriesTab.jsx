import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { CategorySelect } from "./ui/categorySelect";
import apiService from "../services";

export const CategoriesTab = () => {
  const [popularCategories, setPopularCategories] = useState([]);
  const [_, setLoading] = useState(false);
  const [__, setError] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.get("/popularCategory");
        console.log("data popular category : ", data);
        setPopularCategories(data);
      } catch (err) {
        console.console.log(err);
        setLoading(false);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className=" lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Tag size={24} className="text-blue-600" />
            Popular Categories
          </h3>
          {popularCategories.map((cat) => (
            <div key={cat.category} className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{cat.category}</span>
                <span className="font-bold text-blue-600">
                  {cat.q} quantity
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${
                        (cat.sales / popularCategories[0].sales) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
