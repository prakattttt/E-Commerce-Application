import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/layouts/admin/AdminSidebar";
import AdminTopbar from "../components/layouts/admin/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-450">
        <AdminSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar />

          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
