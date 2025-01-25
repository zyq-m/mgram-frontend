import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./app";
import RootLayout from "./components/layout/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App.LoginPage />} />
        <Route element={<RootLayout />}>
          <Route path="app/home" element={<App.Dashboard />} />
          <Route path="app/predict" element={<App.Predict />} />
          <Route path="app/result" element={<App.Result />} />
          <Route path="app/result/:id" element={<App.ResultDetails />} />

          <Route path="app/admin/home" element={<App.AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
