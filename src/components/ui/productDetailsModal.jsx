export const ProductDetailsModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                            {product.image}
                        </div>
                        <h2 className="text-xl font-bold">{product.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Category</p>
                        <p className="font-bold">{product.category}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Price</p>
                        <p className="font-bold text-green-600">${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Stock</p>
                        <p className="font-bold">{product.stock} units</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Total Sales</p>
                        <p className="font-bold">{product.sales}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-blue-600">
                            ${(product.price * product.sales).toFixed(2)}
                        </p>
                    </div>
                </div>

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
