import { useState } from "react";
import { Tag } from "lucide-react";
import { CategorySelect } from "./ui/categorySelect";
import { calculatePopularCategories } from "../utils";


export const CategoriesTab = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const popularCategories = calculatePopularCategories(products);
    const categories = [...new Set(products.map(p => p.category))];
    const categoryProducts = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : [];

    return (
        <div>
            <CategorySelect
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Tag size={24} className="text-blue-600" />
                        Popular Categories
                    </h3>
                    {popularCategories.map((cat) => (
                        <div key={cat.name} className="mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{cat.name}</span>
                                <span className="font-bold text-blue-600">{cat.sales} sales</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all"
                                    style={{ width: `${(cat.sales / popularCategories[0].sales) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCategory && categoryProducts.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold mb-6">
                            Products in {selectedCategory}
                        </h3>
                        {categoryProducts.map((product) => (
                            <div key={product.id} className="flex items-center gap-3 mb-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                                    {product.image}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-gray-600 text-sm">
                                        ${product.price.toFixed(2)} • {product.sales} sales
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
