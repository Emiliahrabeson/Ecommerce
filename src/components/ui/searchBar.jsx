import { Package} from "lucide-react";


export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="relative">
      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      />
    </div>
  </div>
);
