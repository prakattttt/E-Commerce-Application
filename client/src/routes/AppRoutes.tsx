import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import Shop from "../pages/Shop";
import Profile from "../pages/Profile";
import AuthPage from "../pages/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<Shop />} />
        <Route path="profile" element={<Profile />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
