import { useState, useEffect } from "react";
import apiService from "../services";

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.get("/allClients", {
          limit: 100,
          offset: 0,
        });
        console.log(" data tab tab:", data);
        const flattenedData = Array.isArray(data) ? data.flat() : [];

        console.log("Flattened clients:", flattenedData);
        setClients(flattenedData);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return { clients, loading, error };
};

export default useClients;
