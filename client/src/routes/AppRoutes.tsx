import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/HomePage";
import Shop from "../pages/Shop";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import AdminProducts from "../features/admin/pages/AdminProducts";
import AdminCategories from "../features/admin/pages/AdminCategories";
import AdminOrders from "../features/admin/pages/AdminOrders";
import AdminUsers from "../features/admin/pages/AdminUsers";
import NewProduct from "../features/admin/pages/NewProduct";
import NewCategory from "../features/admin/pages/NewCategory";
import ProductDetails from "../pages/ProductDetails";

import AdminHome from "../features/admin/pages/AdminDashboard";

import ProtectAdmin from "../utils/ProtectAdmin";
import FAQPage from "../pages/FAQPage";
import EditProduct from "../features/admin/pages/EditProduct";
import EditCategory from "../features/admin/pages/EditCategory";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import EditProfile from "../features/profile/pages/EditProfile";
import ChangeProfilePicture from "../features/profile/pages/ChangeProfilePicture";
import ChangePassword from "../features/profile/pages/ChangePassword";
import DeleteAccount from "../features/profile/pages/DeleteAccount";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="about" element={<AboutPage />} />

        <Route path="shop" element={<Shop />} />

        <Route path="profile" element={<Profile />} />

        <Route path="profile/settings">
          <Route path="edit" element={<EditProfile />} />
          <Route path="picture" element={<ChangeProfilePicture />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="delete" element={<DeleteAccount />} />
        </Route>

        <Route path="contact" element={<ContactPage />} />

        <Route path="faq" element={<FAQPage />} />

        <Route path="product/:slug" element={<ProductDetails />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/:slug/edit" element={<EditProduct />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<NewCategory />} />
          <Route path="categories/:slug/edit" element={<EditCategory />} />
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
