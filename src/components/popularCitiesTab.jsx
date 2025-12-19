import {calculatePopularCities} from "../utils"
import { MapPin } from "lucide-react";

export const PopularCitiesTab = ({ clients }) => {
    const popularCities = calculatePopularCities(clients);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCities.map((city, index) => (
                <div key={city.name} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                        <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
                        <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                        <p className="text-4xl font-bold text-blue-600 mb-2">{city.orders}</p>
                        <p className="text-gray-600 mb-4">Total Orders</p>
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            #{index + 1} Most Popular
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};