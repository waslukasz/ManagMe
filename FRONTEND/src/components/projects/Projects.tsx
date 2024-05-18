import { useEffect, useState } from "react";
import { Project as ProjectType } from "../../types/ProjectType";
import axios from "../../api/axios";

import Project from "./Project";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  async function fetchAllProjects() {
    setIsFetching(true);
    try {
      await axios.get("/project").then((response) => {
        setProjects(response.data);
      });
    } catch (error) {}
    setIsFetching(false);
  }

  async function fetchActiveProjectId(): Promise<void> {
    const activeProjectId: string | null =
      localStorage.getItem("active_project");

    let result: string = "";

    if (!activeProjectId) {
      await axios.get<ProjectType[]>("/project").then((response) => {
        result = response.data[0]._id;
        localStorage.setItem("active_project", response.data[0]._id);
      });
    }
  }

  useEffect(() => {
    fetchActiveProjectId();
    fetchAllProjects();
  }, []);

  useEffect(() => {
    fetchAllProjects();
    if (!isUpdated) setIsUpdated(true);
  }, [isUpdated]);

  function updateHandler() {
    if (isUpdated) setIsUpdated(false);
  }

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          <SubNavLink to={"/projects/create"} label="Create new project" />
          {isUpdated && projects.length > 0 && (
            <SubNavLink
              to={"/functionalities"}
              label="Active project functionalities"
            />
          )}
        </SubNavigation>
        {isFetching && (
          <p className="text-center text-2xl tracking-wider">
            Loading content...
          </p>
        )}
        {!isFetching && (
          <div className="grid grid-cols-5 auto-rows-fr gap-3 m-3">
            {projects.map((project) => (
              <Project
                key={project._id}
                data={project}
                updateState={isUpdated}
                updateHandler={updateHandler}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
