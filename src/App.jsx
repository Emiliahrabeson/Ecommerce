import { useState } from "react";
import useClients from "./hooks/useClient";
import useProducts from "./hooks/useProducts";
import { Package, TrendingUp, Tag, Users, MapPin, ShoppingCart, BarChart3 } from "lucide-react";
import { AllProductsTab } from "./components/allProductsTab";
import { TopProductsTab } from "./components/topProductsTab";
import { CategoriesTab } from "./components/categoriesTab";
import { ClientsTab } from "./components/clientsTab";
import { PopularCitiesTab } from "./components/popularCitiesTab";
import { StatsCard } from "./components/ui/statsCard";
import { ProductDetailsModal } from "./components/ui/productDetailsModal";


export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, loading: productsLoading } = useProducts();
  const { clients, loading: clientsLoading } = useClients();

  const categories = [...new Set(products.map(p => p.category))];
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  const tabs = [
    { label: 'All Products', icon: Package, component: AllProductsTab },
    { label: 'Top Products', icon: TrendingUp, component: TopProductsTab },
    { label: 'Categories', icon: Tag, component: CategoriesTab },
    { label: 'Clients', icon: Users, component: ClientsTab },
    { label: 'Popular Cities', icon: MapPin, component: PopularCitiesTab }
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  if (productsLoading || clientsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} />
            <h1 className="text-2xl font-bold">E-Commerce Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Package}
            title="Total Products"
            value={products.length}
            color="bg-blue-100 text-blue-600"
          />
          <StatsCard
            icon={Users}
            title="Total Clients"
            value={clients.length}
            color="bg-green-100 text-green-600"
          />
          <StatsCard
            icon={Tag}
            title="Categories"
            value={categories.length}
            color="bg-purple-100 text-purple-600"
          />
          <StatsCard
            icon={BarChart3}
            title="Total Sales"
            value={totalSales}
            color="bg-orange-100 text-orange-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === index
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <ActiveTabComponent
          products={products}
          clients={clients}
          onProductClick={setSelectedProduct}
        />
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}