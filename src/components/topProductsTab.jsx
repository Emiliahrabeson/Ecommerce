
import { calculateTopProducts } from "../utils";

export const TopProductsTab = ({ products }) => {
    const topProducts = calculateTopProducts(products);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topProducts.map((product, index) => (
                <div key={product.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="text-5xl font-bold text-gray-300">#{index + 1}</div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                                    {product.image}
                                </div>
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                    {product.category}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                    {product.sales} sales
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                ${product.price.toFixed(2)}
                            </div>
                            <p className="text-gray-600">Stock: {product.stock} units</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};