import { useEffect, useState } from "react";
import {
  FunctionalityEntity,
  Functionality as FunctionalityType,
} from "../../types/FunctionalityTypes";
import Functionality from "./Functionality";
import FunctionalitiesActiveProject from "./FunctionalitiesActiveProject";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";
import { Project, ProjectEntity } from "../../types/ProjectTypes";
import axiosFull, { AxiosError } from "axios";

export default function Functionalities() {
  const [functionalities, setFunctionalities] = useState<FunctionalityType[]>(
    []
  );
  const [activeProject, setActiveProject] = useState<Project>();
  const [selectedStatus, setSelectedStatus] = useState<number>(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function fetchAllFunctionalities() {
    try {
      await axios
        .get<FunctionalityEntity[]>("/functionality")
        .then((response) => {
          setFunctionalities(
            response.data.map((entity) => new FunctionalityType(entity))
          );
        });
    } catch (error) {}
  }

  async function fetchActiveProject(): Promise<void> {
    const activeProjectId: string | null =
      localStorage.getItem("active_project");

    if (!activeProjectId) {
      await axios.get<ProjectEntity[]>("/project").then((response) => {
        setActiveProject(new Project(response.data[0]));
        localStorage.setItem("active_project", response.data[0]._id);
      });
    } else {
      await axios
        .get<ProjectEntity>(`/project/${activeProjectId}`)
        .then((response) => {
          setActiveProject(new Project(response.data));
        })
        .catch((error: Error | AxiosError) => {
          if (axiosFull.isAxiosError(error) && error.code != "ERR_NETWORK") {
            localStorage.removeItem("active_project");
            fetchActiveProject();
          }
        });
    }
  }

  useEffect(() => {
    setIsFetching(true);
    fetchAllFunctionalities();
    fetchActiveProject();
    setIsFetching(false);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          <SubNavLink to={"/projects"} label="Go to projects" />
          {activeProject && (
            <SubNavLink
              to={"/functionalities/create"}
              label="Create functionality"
            />
          )}
        </SubNavigation>
        {!isFetching && activeProject && (
          <div className="inline-flex flex-col p-3 bg-red-50 items-start">
            <span className="text-xl font-bold mb-2">Active Project</span>
            <FunctionalitiesActiveProject data={activeProject} />
          </div>
        )}
        <span className="text-4xl mt-5 ml-3">Functionalities</span>
        <div className="flex gap-5 mt-5 ml-3">
          <span
            onClick={() => setSelectedStatus(-1)}
            className={
              (selectedStatus == -1 &&
                "select-none text-white bg-blue-500 border-blue-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-blue-500 hover:text-white") ||
              "select-none text-blue-500 border-blue-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-blue-500 hover:text-white"
            }
          >
            ALL
          </span>
          <span
            onClick={() => setSelectedStatus(0)}
            className={
              (selectedStatus == 0 &&
                "select-none text-white bg-red-500 border-red-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-red-500 hover:text-white") ||
              "select-none text-red-500 border-red-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-red-500 hover:text-white"
            }
          >
            TODO
          </span>
          <span
            onClick={() => setSelectedStatus(1)}
            className={
              (selectedStatus == 1 &&
                "select-none text-white bg-yellow-500 border-yellow-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-yellow-500 hover:text-white") ||
              "select-none text-yellow-500 border-yellow-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-yellow-500 hover:text-white"
            }
          >
            DOING
          </span>
          <span
            onClick={() => setSelectedStatus(2)}
            className={
              (selectedStatus == 2 &&
                "select-none text-white bg-green-500 border-green-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-green-500 hover:text-white") ||
              "select-none text-green-500 border-green-500 px-5 py-1 font-mono text-xl border-2  border-solid rounded-3xl cursor-pointer hover:bg-green-500 hover:text-white"
            }
          >
            DONE
          </span>
        </div>
        {isFetching && (
          <p className="text-center text-2xl tracking-wider">
            Loading content...
          </p>
        )}

        {!isFetching && functionalities.length > 0 && (
          <div className="grid grid-cols-5 auto-rows-fr gap-3 m-3">
            {selectedStatus == -1 &&
              functionalities.map(
                (functionality) =>
                  functionality.project.id == activeProject?.id && (
                    <Functionality
                      key={functionality.id}
                      data={functionality}
                      functionalitiesState={[
                        functionalities,
                        setFunctionalities,
                      ]}
                    />
                  )
              )}
            {selectedStatus == 0 &&
              functionalities.length > 0 &&
              functionalities.map(
                (functionality) =>
                  functionality.project.id == activeProject?.id &&
                  functionality.status == 0 && (
                    <Functionality
                      key={functionality.id}
                      data={functionality}
                      functionalitiesState={[
                        functionalities,
                        setFunctionalities,
                      ]}
                    />
                  )
              )}
            {selectedStatus == 1 &&
              functionalities.length > 0 &&
              functionalities.map(
                (functionality) =>
                  functionality.project.id == activeProject?.id &&
                  functionality.status == 1 && (
                    <Functionality
                      key={functionality.id}
                      data={functionality}
                      functionalitiesState={[
                        functionalities,
                        setFunctionalities,
                      ]}
                    />
                  )
              )}
            {selectedStatus == 2 &&
              functionalities.length > 0 &&
              functionalities.map(
                (functionality) =>
                  functionality.project.id == activeProject?.id &&
                  functionality.status == 2 && (
                    <Functionality
                      key={functionality.id}
                      data={functionality}
                      functionalitiesState={[
                        functionalities,
                        setFunctionalities,
                      ]}
                    />
                  )
              )}
          </div>
        )}
      </div>
    </>
  );
}
