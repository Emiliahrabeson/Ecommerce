import { MapPin } from "lucide-react";

export const ClientsTab = ({ clients }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Orders</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total Spent</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                                            {client.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-medium">{client.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{client.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                            {client.city}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">{client.orders}</td>
                                <td className="px-6 py-4 text-right font-bold text-green-600">
                                    ${client.totalSpent.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
