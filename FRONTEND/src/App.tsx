import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Projects from "./components/projects/Projects";

import "./index.css";
import ProjectsCreate from "./components/projects/CreateProject";
import Functionalities from "./components/functionalities/Functionalities";
import CreateFunctionality from "./components/functionalities/CreateFunctionality";
import Tasks from "./components/tasks/Tasks";
import CreateTask from "./components/tasks/CreateTask";
import RequireAuth from "./components/auth/RequireAuth";
import Unauthorized from "./components/auth/Unauthorized";
import Home from "./components/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/projects/create" element={<ProjectsCreate />} />
            <Route
              path="/functionalities/create"
              element={<CreateFunctionality />}
            />
            <Route
              path={"/tasks/create/:functionalityId"}
              element={<CreateTask />}
            />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/functionalities" element={<Functionalities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path={"/tasks/:functionalityId"} element={<Tasks />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
