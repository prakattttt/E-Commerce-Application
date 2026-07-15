import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "../components/layouts/admin/AdminSidebar";
import AdminTopbar from "../components/layouts/admin/AdminTopbar";
import AdminMobileSidebar from "../components/layouts/admin/AdminMobileSidebar";

const AdminLayout = () => {
  // Controls the visibility of the mobile sidebar drawer.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar visible on large screens. */}
      <AdminSidebar />

      {/* Mobile sidebar drawer for tablets and phones. */}
      <AdminMobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area. */}
      <div className="lg:ml-72">
        {/* Top navigation bar. */}
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Render the selected admin page here. */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
