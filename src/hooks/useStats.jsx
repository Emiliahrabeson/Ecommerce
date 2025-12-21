import { useState, useEffect } from "react";
import apiService from "../services";

const useStats = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("mande");
    const fetchStats = async () => {
      try {
        setLoading(true);
        // const response = await apiService.get("/stats");
        const response = await fetch("http://localhost:3000/api/stats");
        const data = await response.json();

        console.log("REspnse", data);
        setStatistics(data);
      } catch (err) {
        console.error("Hook Error:", err);
        setError(err.message || "Failed to fetch statistics");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { statistics, loading, error };
};

export default useStats;
