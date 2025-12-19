export const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm mb-2">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={32} />
            </div>
        </div>
    </div>
);