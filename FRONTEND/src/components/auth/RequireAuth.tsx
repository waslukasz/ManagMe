import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export default function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {});

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  );
}
