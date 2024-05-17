import { useEffect, useState } from "react";
import { Functionality as FunctionalityType } from "../../types/FunctionalityType";
import { Project as ProjectType } from "../../types/ProjectType";
import Functionality from "./Functionality";
import FunctionalitiesActiveProject from "./FunctionalitiesActiveProject";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";

export default function Functionalities() {
  const [functionalities, setFunctionalities] = useState<FunctionalityType[]>(
    []
  );
  const [activeProject, setActiveProject] = useState<ProjectType>();
  const [selectedStatus, setSelectedStatus] = useState<number>(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  async function fetchAllFunctionalities() {
    setIsFetching(true);
    try {
      await axios.get("/functionality").then((response) => {
        setFunctionalities(response.data);
      });
      await axios
        .get(`/project/${localStorage.getItem("active_project")}`)
        .then((response) => {
          setActiveProject(response.data);
        });
    } catch (error) {}
    setIsFetching(false);
  }

  useEffect(() => {
    if (!localStorage.getItem("active_project"))
      axios.get("/project").then((result) => {
        localStorage.setItem("active_project", result.data[0]._id);
      });
    fetchAllFunctionalities();
    if (!isUpdated) setIsUpdated(true);
  }, [isUpdated]);

  function updateHandler() {
    if (isUpdated) setIsUpdated(false);
  }

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
            <FunctionalitiesActiveProject data={activeProject!} />
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

        {!isFetching && (
          <div className="grid grid-cols-5 auto-rows-fr gap-3 m-3">
            {isUpdated &&
              selectedStatus == -1 &&
              functionalities.map(
                (functionality) =>
                  functionality.project._id == activeProject?._id && (
                    <Functionality
                      key={functionality._id}
                      data={functionality}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              )}
            {isUpdated &&
              selectedStatus == 0 &&
              functionalities.map(
                (functionality) =>
                  functionality.project._id == activeProject?._id &&
                  functionality.status == 0 && (
                    <Functionality
                      key={functionality._id}
                      data={functionality}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              )}
            {isUpdated &&
              selectedStatus == 1 &&
              functionalities.map(
                (functionality) =>
                  functionality.project._id == activeProject?._id &&
                  functionality.status == 1 && (
                    <Functionality
                      key={functionality._id}
                      data={functionality}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              )}
            {isUpdated &&
              selectedStatus == 2 &&
              functionalities.map(
                (functionality) =>
                  functionality.project._id == activeProject?._id &&
                  functionality.status == 2 && (
                    <Functionality
                      key={functionality._id}
                      data={functionality}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              )}
          </div>
        )}
      </div>
    </>
  );
}
