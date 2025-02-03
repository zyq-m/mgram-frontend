import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App, { ProtectedRoute } from "./app";
import RootLayout from "./components/layout/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App.LoginPage />} />
        <Route element={<RootLayout />}>
          <Route
            element={
              <ProtectedRoute allowed={["USER"]} redirect="/app/admin/home" />
            }
          >
            <Route path="app/home" element={<App.Dashboard />} />
            <Route path="app/predict" element={<App.Predict />} />
          </Route>
          <Route element={<ProtectedRoute allowed={["USER", "ADMIN"]} />}>
            <Route path="app/result" element={<App.Result />} />
            <Route path="app/result/:id" element={<App.ResultDetails />} />
            <Route path="app/password" element={<App.ChangePassword />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowed={["ADMIN"]} redirect="/app/home" />
            }
          >
            <Route path="app/admin/home" element={<App.AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
