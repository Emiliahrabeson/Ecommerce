export const calculateTopProducts = (products, limit = 5) => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, limit);
};

export const calculatePopularCategories = (products) => {
    const categoryCounts = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + p.sales;
        return acc;
    }, {});

    return Object.entries(categoryCounts)
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => b.sales - a.sales);
};

export const calculatePopularCities = (clients) => {
    const cityCounts = clients.reduce((acc, c) => {
        acc[c.city] = (acc[c.city] || 0) + c.orders;
        return acc;
    }, {});

    return Object.entries(cityCounts)
        .map(([name, orders]) => ({ name, orders }))
        .sort((a, b) => b.orders - a.orders);
};