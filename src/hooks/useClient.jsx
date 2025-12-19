import { useState, useEffect } from "react";

const useClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const data = await mockDataService.getClients();
                setClients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    return { clients, loading, error };
};

export default useClients;