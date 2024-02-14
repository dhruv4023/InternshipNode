import AboutUs from "../Pages/AboutUs/AboutUs";
import { LoginPage } from "../Pages/LoginPage/LoginPage";
import PageNotFound from "../Pages/PageNotFound";
import { ProfilePage } from "../Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/:page"} element={<LoginPage />} />
      <Route path={"/about"} element={<AboutUs />} />
      <Route path={"/profile/:UID"} element={<ProfilePage />} />
      <Route path={"/404"} element={<PageNotFound />} />
    </Routes>
  );
};
