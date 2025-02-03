import LoginPage from "./login/page";
import Dashboard from "./dashboard/page";
import Predict from "./predict/page";
import Result from "./result/page";
import ResultDetails from "./result/details";
import AdminDashboard from "./admin/dashboard";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default {
  LoginPage,
  Dashboard,
  Predict,
  Result,
  ResultDetails,
  AdminDashboard,
};

type ProtectedRouteProps = {
  redirect?: string;
  allowed: string[];
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function ProtectedRoute({
  redirect = "/app/home",
  allowed,
}: ProtectedRouteProps) {
  const token = sessionStorage.getItem("accessToken");
  const [auth, setAuth] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (token) {
      const { sub }: { sub: AuthUser } = jwtDecode(token);
      setAuth(sub);
    }
  }, [token]);

  if (!auth) {
    // Render null or a loading component until the auth state is set
    return null;
  }

  if (!allowed.includes(auth?.role)) {
    return <Navigate to={redirect} replace />;
  }

  console.log(!allowed.includes(auth?.role));

  return <Outlet />;
}
