import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import PageMetadata from "../components/seo/PageMetadata";

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
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import Payment from "../pages/Payment";
import OrderDetails from "../pages/OrderDetails";

import AdminHome from "../features/admin/pages/AdminDashboard";

import ProtectAdmin from "../utils/ProtectAdmin";
import PublicOnly from "../utils/PublicOnly";
import FAQPage from "../pages/FAQPage";
import EditProduct from "../features/admin/pages/EditProduct";
import EditCategory from "../features/admin/pages/EditCategory";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import EditProfile from "../features/profile/pages/EditProfile";
import ChangeProfilePicture from "../features/profile/pages/ChangeProfilePicture";
import ChangePassword from "../features/profile/pages/ChangePassword";
import DeleteAccount from "../features/profile/pages/DeleteAccount";
import AdminOrderDetails from "../features/admin/pages/AdminOrdersDetails";
import ProfileOrders from "../features/profile/pages/ProfileOrders";
import ProfileWishlist from "../features/profile/pages/ProfileWishlist";
import ProfileSettings from "../features/profile/pages/ProfileSettings";

const withMetadata = (
  title: string,
  description: string,
  page: ReactNode,
) => (
  <PageMetadata title={`ShopSphere | ${title}`} description={description}>
    {page}
  </PageMetadata>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route
          index
          element={withMetadata(
            "Home",
            "Discover quality products, great deals, and a seamless shopping experience at ShopSphere.",
            <HomePage />,
          )}
        />

        <Route
          path="about"
          element={withMetadata(
            "About Us",
            "Learn about ShopSphere, our story, and our commitment to making online shopping simple and reliable.",
            <AboutPage />,
          )}
        />

        <Route
          path="shop"
          element={withMetadata(
            "Shop",
            "Browse the ShopSphere collection and find quality products selected for your everyday needs.",
            <Shop />,
          )}
        />

        <Route
          path="/profile"
          element={withMetadata(
            "My Account",
            "View and manage your ShopSphere account, orders, wishlist, and personal settings.",
            <Profile />,
          )}
        >
          <Route index element={<Navigate to="orders" replace />} />
          <Route
            path="orders"
            element={withMetadata(
              "My Orders",
              "Review your ShopSphere order history and check the status of your purchases.",
              <ProfileOrders />,
            )}
          />
          <Route
            path="wishlist"
            element={withMetadata(
              "My Wishlist",
              "Keep track of the products you have saved to your ShopSphere wishlist.",
              <ProfileWishlist />,
            )}
          />
          <Route
            path="settings"
            element={withMetadata(
              "Account Settings",
              "Manage your ShopSphere profile, account preferences, and security settings.",
              <ProfileSettings />,
            )}
          />
        </Route>

        <Route path="profile/settings">
          <Route
            path="edit"
            element={withMetadata(
              "Edit Profile",
              "Update the name and contact details associated with your ShopSphere account.",
              <EditProfile />,
            )}
          />
          <Route
            path="picture"
            element={withMetadata(
              "Change Profile Picture",
              "Update the profile picture displayed on your ShopSphere account.",
              <ChangeProfilePicture />,
            )}
          />
          <Route
            path="password"
            element={withMetadata(
              "Change Password",
              "Change your ShopSphere password to help keep your account secure.",
              <ChangePassword />,
            )}
          />
          <Route
            path="delete"
            element={withMetadata(
              "Delete Account",
              "Review the steps for permanently deleting your ShopSphere account.",
              <DeleteAccount />,
            )}
          />
        </Route>

        <Route
          path="/orders/:orderId"
          element={withMetadata(
            "Order Details",
            "View the details and current status of your ShopSphere order.",
            <OrderDetails />,
          )}
        />

        <Route
          path="contact"
          element={withMetadata(
            "Contact Us",
            "Get in touch with the ShopSphere team for help with products, orders, or your account.",
            <ContactPage />,
          )}
        />

        <Route
          path="faq"
          element={withMetadata(
            "Frequently Asked Questions",
            "Find answers to common questions about ShopSphere orders, delivery, payments, and support.",
            <FAQPage />,
          )}
        />

        <Route
          path="product/:slug"
          element={withMetadata(
            "Product Details",
            "Explore product details, customer reviews, and related items available at ShopSphere.",
            <ProductDetails />,
          )}
        />

        <Route
          path="cart"
          element={withMetadata(
            "Shopping Cart",
            "Review the products in your ShopSphere cart before continuing to checkout.",
            <CartPage />,
          )}
        />

        <Route
          path="checkout"
          element={withMetadata(
            "Checkout",
            "Confirm your delivery details and review your order before placing it with ShopSphere.",
            <Checkout />,
          )}
        />
        <Route
          path="/payment/:orderId"
          element={withMetadata(
            "Payment",
            "Complete payment for your ShopSphere order using an available payment method.",
            <Payment />,
          )}
        />

        <Route
          path="/order-confirmation/:orderId"
          element={withMetadata(
            "Order Confirmation",
            "Your ShopSphere order has been received. Review your order confirmation and next steps.",
            <OrderConfirmation />,
          )}
        />
      </Route>

      <Route element={<PublicOnly />}>
        <Route
          path="login"
          element={withMetadata(
            "Sign In",
            "Sign in to your ShopSphere account to manage orders, saved products, and account details.",
            <LoginPage />,
          )}
        />
        <Route
          path="register"
          element={withMetadata(
            "Create an Account",
            "Create a ShopSphere account to place orders and manage your shopping experience.",
            <RegisterPage />,
          )}
        />
      </Route>

      {/* Admin */}
      <Route element={<ProtectAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={withMetadata(
              "Admin Dashboard",
              "Monitor ShopSphere store activity, key metrics, and recent orders from the admin dashboard.",
              <AdminHome />,
            )}
          />
          <Route
            path="products"
            element={withMetadata(
              "Manage Products",
              "View and manage products available in the ShopSphere catalog.",
              <AdminProducts />,
            )}
          />
          <Route
            path="products/new"
            element={withMetadata(
              "Add Product",
              "Add a new product to the ShopSphere catalog.",
              <NewProduct />,
            )}
          />
          <Route
            path="products/:slug/edit"
            element={withMetadata(
              "Edit Product",
              "Update product information and availability in the ShopSphere catalog.",
              <EditProduct />,
            )}
          />
          <Route
            path="categories"
            element={withMetadata(
              "Manage Categories",
              "Organize and manage product categories in the ShopSphere catalog.",
              <AdminCategories />,
            )}
          />
          <Route
            path="categories/new"
            element={withMetadata(
              "Add Category",
              "Create a category to organize products in the ShopSphere catalog.",
              <NewCategory />,
            )}
          />
          <Route
            path="categories/:slug/edit"
            element={withMetadata(
              "Edit Category",
              "Update a product category in the ShopSphere catalog.",
              <EditCategory />,
            )}
          />
          <Route
            path="orders"
            element={withMetadata(
              "Manage Orders",
              "Review and manage customer orders placed through ShopSphere.",
              <AdminOrders />,
            )}
          />
          <Route
            path="orders/:orderId"
            element={withMetadata(
              "Manage Order",
              "Review the details and fulfillment status of a ShopSphere customer order.",
              <AdminOrderDetails />,
            )}
          />
          <Route
            path="users"
            element={withMetadata(
              "Manage Users",
              "View and manage registered ShopSphere customer accounts.",
              <AdminUsers />,
            )}
          />
        </Route>
      </Route>
      {/* 404 */}
      <Route
        path="*"
        element={withMetadata(
          "Page Not Found",
          "The page you are looking for could not be found. Browse ShopSphere to continue shopping.",
          <ErrorPage />,
        )}
      />
    </Routes>
  );
};

export default AppRoutes;
