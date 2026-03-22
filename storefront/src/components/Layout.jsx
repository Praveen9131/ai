import { Outlet } from "react-router-dom";
import CtaBanner from "./CtaBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream font-body text-base font-medium leading-relaxed text-brand-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CtaBanner />
      <Footer />
    </div>
  );
}
