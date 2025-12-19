const apiService = {
  baseURL: "http://localhost:3000/api",

  async get(endpoint, params = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, params);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  // function searchProduct(params) {
  //   return await this.get(
  //     `/searchProduct?offset={params.offset}`)
  // }
};

export default apiService;
