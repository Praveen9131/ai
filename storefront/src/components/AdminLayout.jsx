import {
  BarChart3,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({ activeTab, onTabChange, children }) {
  return (
    <div className="flex min-h-screen bg-brand-cream font-body text-brand-dark">
      <aside className="fixed bottom-0 left-0 top-0 z-40 w-16 border-r border-brand-light bg-white md:w-56">
        <div className="hidden p-4 md:block">
          <p className="font-heading text-lg font-bold text-brand-green">
            Zaanvi
          </p>
          <p className="text-xs text-brand-dark/60">Admin</p>
        </div>
        <nav className="flex flex-col gap-1 p-2 md:p-3">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition md:px-4 ${
                  active
                    ? "bg-brand-green text-white"
                    : "text-brand-dark hover:bg-brand-light"
                }`}
                title={label}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="hidden md:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col pl-16 md:pl-56">
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
