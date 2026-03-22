import { useMemo, useState } from "react";
import PasswordGate from "../components/PasswordGate.jsx";
import AdminLayout from "../components/AdminLayout.jsx";
import { products as seedProducts } from "../data/products.js";
import { orders as seedOrders } from "../data/orders.js";
import { customers } from "../data/customers.js";
import { useToast } from "../context/ToastContext.jsx";

const OVERVIEW = {
  totalProducts: 17,
  totalOrders: 43,
  revenue: 38450,
  pendingOrders: 5,
};

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered"];

const statusChipClass = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Pending: "bg-red-100 text-red-800",
};

const CATEGORIES = [
  "Trimester 1",
  "Trimester 2",
  "Trimester 3",
  "Postpartum",
  "Kit",
];

/** Static analytics (no backend) */
const SALES_BY_CATEGORY = [
  { label: "Trimester 1", pct: 22 },
  { label: "Trimester 2", pct: 28 },
  { label: "Trimester 3", pct: 18 },
  { label: "Postpartum", pct: 17 },
  { label: "Kits", pct: 15 },
];

const TOP_PRODUCTS = [
  { name: "First Trimester Wellness Kit", units: 142 },
  { name: "Ragi Kanji Mix", units: 118 },
  { name: "Second Trimester Strength Kit", units: 96 },
];

const MONTHLY_REVENUE = [
  { month: "Jan 2025", revenue: 11800 },
  { month: "Feb 2025", revenue: 13200 },
  { month: "Mar 2025", revenue: 13450 },
];

function trimesterLabel(t) {
  if (t === 0) return "Postpartum";
  return String(t);
}

function cloneProducts() {
  return seedProducts.map((p) => ({ ...p }));
}

export default function Admin() {
  const { showToast } = useToast();
  const [tab, setTab] = useState("overview");
  const [productList, setProductList] = useState(cloneProducts);
  const [orderList, setOrderList] = useState(() =>
    seedOrders.map((o) => ({ ...o }))
  );
  const [orderFilter, setOrderFilter] = useState("All");
  const [customerQuery, setCustomerQuery] = useState("");
  const [modal, setModal] = useState(null);
  /** modal: null | { mode: 'add' } | { mode: 'edit', product } */

  const recentOrders = useMemo(() => {
    return [...orderList]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [orderList]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === "All") return orderList;
    return orderList.filter((o) => o.status === orderFilter);
  }, [orderList, orderFilter]);

  const filteredCustomers = useMemo(() => {
    const q = customerQuery.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [customerQuery]);

  const openAdd = () =>
    setModal({
      mode: "add",
      form: {
        name: "",
        category: "Trimester 1",
        price: "",
        weight: "",
        description: "",
        trimester: 1,
        tag: "",
      },
    });

  const openEdit = (product) =>
    setModal({
      mode: "edit",
      product,
      form: {
        name: product.name,
        category: product.category,
        price: String(product.price),
        weight: product.weight,
        description: product.description,
        trimester: product.trimester,
        tag: product.tag,
      },
    });

  const saveModal = (e) => {
    e.preventDefault();
    if (!modal) return;
    const f = modal.form;
    const price = Number(f.price);
    if (!f.name.trim() || Number.isNaN(price)) return;

    if (modal.mode === "add") {
      const nextId = Math.max(...productList.map((p) => p.id), 0) + 1;
      setProductList((prev) => [
        ...prev,
        {
          id: nextId,
          name: f.name.trim(),
          category: f.category,
          price,
          weight: f.weight.trim() || "—",
          trimester: Number(f.trimester),
          tag: f.tag.trim() || "New",
          description: f.description.trim() || "",
          audiences: ["pregnancy", "wellness"],
          useCases: [
            "Everyday millet nutrition",
            "Family-friendly meals",
            "Wholesome pantry staple",
          ],
        },
      ]);
    } else {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === modal.product.id
            ? {
                ...p,
                name: f.name.trim(),
                category: f.category,
                price,
                weight: f.weight.trim() || p.weight,
                trimester: Number(f.trimester),
                tag: f.tag.trim() || p.tag,
                description: f.description.trim() || p.description,
              }
            : p
        )
      );
    }
    showToast("Product updated successfully.");
    setModal(null);
  };

  const updateOrderStatus = (id, status) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <PasswordGate>
      <AdminLayout activeTab={tab} onTabChange={setTab}>
        {tab === "overview" && (
          <div className="space-y-8">
            <h1 className="font-heading text-2xl text-brand-dark md:text-3xl">
              Overview
            </h1>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Products", value: OVERVIEW.totalProducts },
                { label: "Total Orders", value: OVERVIEW.totalOrders },
                {
                  label: "Revenue",
                  value: `â‚¹${OVERVIEW.revenue.toLocaleString("en-IN")}`,
                },
                { label: "Pending Orders", value: OVERVIEW.pendingOrders },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl bg-white p-5 shadow-md"
                >
                  <p className="text-sm text-brand-dark/60">{c.label}</p>
                  <p className="mt-2 font-heading text-2xl text-brand-green">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-lg text-brand-dark">
                Recent Orders
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-light text-brand-dark/60">
                      <th className="pb-2 pr-4">Order ID</th>
                      <th className="pb-2 pr-4">Customer</th>
                      <th className="pb-2 pr-4">Product</th>
                      <th className="pb-2 pr-4">Amount</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-b border-brand-light/80">
                        <td className="py-3 pr-4 font-medium">{o.id}</td>
                        <td className="py-3 pr-4">{o.customer}</td>
                        <td className="py-3 pr-4">{o.product}</td>
                        <td className="py-3 pr-4">â‚¹{o.amount}</td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusChipClass[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-heading text-2xl text-brand-dark md:text-3xl">
                Products
              </h1>
              <button
                type="button"
                onClick={openAdd}
                className="rounded-full bg-brand-green px-6 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-light bg-brand-cream/50 text-brand-dark/70">
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Weight</th>
                    <th className="p-4">Trimester</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((p) => (
                    <tr key={p.id} className="border-b border-brand-light/80">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4">â‚¹{p.price}</td>
                      <td className="p-4">{p.weight}</td>
                      <td className="p-4">{trimesterLabel(p.trimester)}</td>
                      <td className="p-4">
                        <button
                          type="button"
                          className="mr-2 text-brand-green hover:underline"
                          onClick={() => openEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:underline"
                          onClick={() => {
                            showToast("Delete feature coming soon.");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-6">
            <h1 className="font-heading text-2xl text-brand-dark md:text-3xl">
              Orders
            </h1>
            <div className="flex flex-wrap gap-2">
              {["All", ...STATUS_OPTIONS].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setOrderFilter(s)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    orderFilter === s
                      ? "bg-brand-green text-white"
                      : "bg-white text-brand-dark shadow-sm hover:bg-brand-light"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-light bg-brand-cream/50 text-brand-dark/70">
                    <th className="p-4">Order #</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="border-b border-brand-light/80">
                      <td className="p-4 font-medium">{o.id}</td>
                      <td className="p-4">{o.date}</td>
                      <td className="p-4">{o.customer}</td>
                      <td className="p-4">{o.city}</td>
                      <td className="p-4">{o.product}</td>
                      <td className="p-4">â‚¹{o.amount}</td>
                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value)
                          }
                          className="rounded-full border border-brand-light bg-brand-cream px-3 py-1.5 text-sm outline-none focus:border-brand-green"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "customers" && (
          <div className="space-y-6">
            <h1 className="font-heading text-2xl text-brand-dark md:text-3xl">
              Customers
            </h1>
            <input
              type="search"
              placeholder="Search by name or email..."
              value={customerQuery}
              onChange={(e) => setCustomerQuery(e.target.value)}
              className="w-full max-w-md rounded-full border border-brand-light bg-white px-4 py-2.5 outline-none focus:border-brand-green"
            />
            <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-light bg-brand-cream/50 text-brand-dark/70">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Orders</th>
                    <th className="p-4">Total Spent</th>
                    <th className="p-4">Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="border-b border-brand-light/80">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.city}</td>
                      <td className="p-4">{c.orders}</td>
                      <td className="p-4">â‚¹{c.totalSpent}</td>
                      <td className="p-4">{c.lastOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="space-y-10">
            <h1 className="font-heading text-2xl text-brand-dark md:text-3xl">
              Analytics
            </h1>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-lg text-brand-dark">
                Sales by category
              </h2>
              <p className="mt-1 text-xs text-brand-dark/60">
                Share of revenue (illustrative)
              </p>
              <ul className="mt-6 space-y-4">
                {SALES_BY_CATEGORY.map((row) => (
                  <li key={row.label}>
                    <div className="flex justify-between text-sm">
                      <span>{row.label}</span>
                      <span className="font-medium text-brand-green">
                        {row.pct}%
                      </span>
                    </div>
                    <div className="mt-1 h-3 overflow-hidden rounded-full bg-brand-cream">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-gold transition-all"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-lg text-brand-dark">
                Top 3 selling products
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
                {TOP_PRODUCTS.map((p) => (
                  <li key={p.name}>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-brand-dark/60"> â€” {p.units} units</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-lg text-brand-dark">
                Monthly revenue
              </h2>
              <table className="mt-4 w-full max-w-md text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-light text-brand-dark/60">
                    <th className="py-2 pr-4">Month</th>
                    <th className="py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_REVENUE.map((m) => (
                    <tr key={m.month} className="border-b border-brand-light/80">
                      <td className="py-3 pr-4">{m.month}</td>
                      <td className="py-3 font-medium text-brand-green">
                        â‚¹{m.revenue.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="font-heading text-xl text-brand-dark">
                {modal.mode === "add" ? "Add product" : "Edit product"}
              </h2>
              <form onSubmit={saveModal} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    required
                    value={modal.form.name}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        form: { ...m.form, name: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-brand-light px-4 py-2 outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={modal.form.category}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        form: { ...m.form, category: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-brand-light bg-white px-4 py-2 outline-none focus:border-brand-green"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price (â‚¹)</label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={modal.form.price}
                      onChange={(e) =>
                        setModal((m) => ({
                          ...m,
                          form: { ...m.form, price: e.target.value },
                        }))
                      }
                      className="mt-1 w-full rounded-full border border-brand-light px-4 py-2 outline-none focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Weight</label>
                    <input
                      value={modal.form.weight}
                      onChange={(e) =>
                        setModal((m) => ({
                          ...m,
                          form: { ...m.form, weight: e.target.value },
                        }))
                      }
                      className="mt-1 w-full rounded-full border border-brand-light px-4 py-2 outline-none focus:border-brand-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Trimester</label>
                  <select
                    value={modal.form.trimester}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        form: { ...m.form, trimester: Number(e.target.value) },
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-brand-light bg-white px-4 py-2 outline-none focus:border-brand-green"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={0}>Postpartum (0)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tag</label>
                  <input
                    value={modal.form.tag}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        form: { ...m.form, tag: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-brand-light px-4 py-2 outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    rows={3}
                    value={modal.form.description}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        form: { ...m.form, description: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-2xl border border-brand-light px-4 py-2 outline-none focus:border-brand-green"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-full bg-brand-green px-6 py-2 text-sm font-medium text-white"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className="rounded-full border border-brand-light px-6 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </PasswordGate>
  );
}
