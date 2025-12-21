import { useEffect, useState } from "react";
import apiService from "../../services";

export const ProductDetailsModal = ({ product, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product?.product_id) return;

      setLoading(true);
      try {
        const data = await apiService.get(`/productInfo/${product.product_id}`);
        console.log("details :", data);

        let productData = null;

        if (Array.isArray(data) && data.length > 0) {
          productData = data[0];
        } else if (data && typeof data === "object") {
          productData = data;
        }

        if (productData) {
          if (!Array.isArray(productData.derniers_avis)) {
            productData.derniers_avis = [];
          }
          setDetails(productData);
        } else {
          console.error("data:", data);
        }
      } catch (error) {
        console.error("erreur de fetch", error);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product?.product_id]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">
              {details?.product_name || product.product_name || "Loading..."}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading details...
          </div>
        ) : details ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Category</p>
                <p className="font-bold">{details.category || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Mark</p>
                <p className="font-bold">{details.brand || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Price</p>
                <p className="font-bold text-green-600">
                  ${parseFloat(details.price || 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Note</p>
                <p className="font-bold">
                  {parseFloat(details.rating || 0).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Sales</p>
                <p className="font-bold text-blue-600">
                  {details.nb_ventes || 0}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">views</p>
                <p className="font-bold text-purple-600">
                  {details.nb_consultations || 0}
                </p>
              </div>
            </div>

            {/*avis */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Last review</h3>
              {details.derniers_avis && details.derniers_avis.length > 0 ? (
                <div className="space-y-3">
                  {details.derniers_avis.map((avis, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {parseFloat(avis.rating || 0).toFixed(1)}
                          </span>
                          <span className="text-yellow-500"></span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {avis.review_date
                            ? new Date(avis.review_date).toLocaleDateString(
                                "fr-FR"
                              )
                            : "N/A"}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {avis.review_text || avis.comment || "No comments"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">no comments available</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No details available
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
