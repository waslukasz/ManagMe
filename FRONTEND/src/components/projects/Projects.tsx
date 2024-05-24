import { useEffect, useState } from "react";
import axios from "../../api/axios";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import {
  Project as ProjectType,
  ProjectEntity,
} from "../../types/ProjectTypes";
import Project from "./Project";
import axiosFull, { AxiosError } from "axios";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectType>(
    {} as ProjectType
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    fetchActiveProject();
    fetchAllProjects();
    setIsFetching(false);
  }, []);

  async function fetchAllProjects() {
    setIsFetching(true);
    try {
      await axios.get<ProjectEntity[]>("/project").then((response) => {
        setProjects(response.data.map((entity) => new ProjectType(entity)));
      });
    } catch (error) {}
    setIsFetching(false);
  }

  async function fetchActiveProject(): Promise<void> {
    const activeProjectId: string | null =
      localStorage.getItem("active_project");

    if (!activeProjectId) {
      await axios.get<ProjectEntity[]>("/project").then((response) => {
        setActiveProject(new ProjectType(response.data[0]));
        localStorage.setItem("active_project", response.data[0]._id);
      });
    } else {
      await axios
        .get<ProjectEntity>(`/project/${activeProjectId}`)
        .then((response) => {
          setActiveProject(new ProjectType(response.data));
        })
        .catch((error: Error | AxiosError) => {
          if (axiosFull.isAxiosError(error) && error.code != "ERR_NETWORK") {
            localStorage.removeItem("active_project");
            fetchActiveProject();
          }
        });
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          {projects.length > 0 && (
            <SubNavLink to={"/functionalities"} label="Functionalities" />
          )}
          <SubNavLink to={"/projects/create"} label="Add project" />
        </SubNavigation>
        {isFetching && (
          <p className="text-center text-2xl tracking-wider">
            Loading content...
          </p>
        )}
        {!isFetching && activeProject.id && (
          <div className="grid grid-cols-1 content-stretch gap-3 m-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {projects.map((project) => (
              <Project
                key={project.id}
                data={project}
                projectsState={[projects, setProjects]}
                activeProjectState={[activeProject, setActiveProject]}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
