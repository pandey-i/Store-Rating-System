import { useEffect,useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
  document.body.style.overflow = sidebarOpen
    ? "hidden"
    : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [sidebarOpen]);
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}