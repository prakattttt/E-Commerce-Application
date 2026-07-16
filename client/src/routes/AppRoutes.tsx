import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/HomePage";
import Shop from "../pages/Shop";
import Profile from "../pages/Profile";
import AuthPage from "../pages/AuthPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";

import AdminHome from "../pages/admin/AdminDashboard";

import ProtectAdmin from "../utils/ProtectAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="about" element={<AboutPage />} />

        <Route path="shop" element={<Shop />} />

        <Route path="profile" element={<Profile />} />

        <Route path="auth" element={<AuthPage />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />

          {/* future */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>
      {/* 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
