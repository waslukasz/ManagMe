import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Unauthorized() {
  const auth = useAuth();

  return auth?.user ? (
    <Navigate to={"/"} />
  ) : (
    <div>Please login to continue.</div>
  );
}
