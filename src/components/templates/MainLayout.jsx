import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar.jsx";
import Footer from "../organisms/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
