import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UserDtoLogin } from "../../types/UserTypes";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function NavAuth() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setLoginData] = useState<UserDtoLogin>(new UserDtoLogin());
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  async function handleLogin() {
    await auth.signIn(form.username, form.password);
    setLoginFailed(!auth.isLoggedIn);
    if (from != "/") navigate(from, { replace: true });
  }

  async function handleOauth(credResponse: CredentialResponse) {
    auth.oauth(credResponse);
    if (from != "/") navigate(from, { replace: true });
  }

  async function handleLogout() {
    await auth.signOut();
    setLoginData(new UserDtoLogin());
    setLoginFailed(false);
    setShowLogin(false);
  }

  return (
    <>
      {auth.isLoggedIn && (
        <div>
          <button
            className="select-none text-red-500 hover:text-white hover:bg-red-500 border-red-500 font-mono rounded-md border-solid border p-2  cursor-pointer transition-colors duration-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      {!auth.isLoggedIn && (
        <div className="relative z-50">
          <div
            onClick={() => setShowLogin((prevState) => !prevState)}
            className={`select-none ${
              !showLogin && "text-blue-500 hover:text-white hover:bg-blue-500"
            } border-blue-500 font-mono rounded-md border-solid border p-2  cursor-pointer transition-colors duration-100 ${
              showLogin && "text-white bg-blue-500 hover:text-black"
            }`}
          >
            Login
          </div>

          {showLogin && (
            <div className="text-black bg-white shadow absolute top-12 right-0 p-5 w-64 rounded font-sans">
              <label className="font-bold text-sm">Username</label>
              <input
                value={form.username}
                onChange={(event) =>
                  setLoginData({ ...form, username: event.target.value })
                }
                type="text"
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow focus:shadow-gray-400 mt-1 mb-3"
              />
              <label className="font-bold text-sm">Password</label>
              <input
                value={form.password}
                onChange={(event) =>
                  setLoginData({ ...form, password: event.target.value })
                }
                type="password"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow focus:shadow-gray-400 mt-1"
              />
              {loginFailed && (
                <span className="text-xs text-red-400 ml-1">
                  Invalid username or password.
                </span>
              )}
              <div className="flex justify-between flex-col items-center mt-3">
                <button
                  onClick={handleLogin}
                  className="shadow px-4 py-2.5 mb-3 rounded bg-blue-400 font-bold text-white hover:bg-blue-500"
                >
                  Sign in
                </button>
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleOauth(credentialResponse)
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
