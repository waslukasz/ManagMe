import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Task from "./Task";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";
import { TaskEntity, Task as TaskType } from "../../types/TaskTypes";
import { Status } from "../../types/UtilTypes";

export default function Tasks() {
  const { functionalityId } = useParams();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  async function fetchAllTasks() {
    setIsFetching(true);
    try {
      await axios.get<TaskEntity[]>("/task").then((response) => {
        setTasks(response.data.map((entity) => new TaskType(entity)));
      });
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  }

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    fetchAllTasks();
    if (!isUpdated) setIsUpdated(true);
  }, [isUpdated]);

  function updateHandler() {
    if (isUpdated) setIsUpdated(false);
  }

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          <SubNavLink to={"/projects"} label="Go back to projects" />
          <SubNavLink
            to={"/functionalities"}
            label="Go back to functionalities"
          />
          <SubNavLink
            to={"/tasks/create/" + functionalityId}
            label="Create task"
          />
        </SubNavigation>

        <span className="text-4xl mt-5 ml-3">Tasks</span>
        {isFetching && (
          <p className="text-center text-2xl tracking-wider">
            Loading content...
          </p>
        )}
        {!isFetching && isUpdated && (
          <div className="grid grid-cols-3 gap-3 m-3 font-mono">
            <div className="grid grid-cols-1 auto-rows-min gap-3 font-sans">
              <div className="text-2xl text-center font-bold tracking-wider">
                TODO
              </div>
              {tasks.map(
                (task) =>
                  task.functionality.id == functionalityId &&
                  task.status == Status.TODO && (
                    <Task
                      key={task.id}
                      data={task}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              ) || <p>No tasks to display...</p>}
            </div>

            <div className="grid grid-cols-1 auto-rows-min gap-3 font-sans">
              <div className="text-2xl text-center font-bold tracking-wider">
                Doing
              </div>
              {tasks.map(
                (task) =>
                  task.functionality.id == functionalityId &&
                  task.status == Status.DOING && (
                    <Task
                      key={task.id}
                      data={task}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              ) || <p>No tasks to display...</p>}
            </div>

            <div className="grid grid-cols-1 auto-rows-min gap-3 font-sans">
              <div className="text-2xl text-center font-bold tracking-wider">
                Done
              </div>
              {tasks.map(
                (task) =>
                  task.functionality.id == functionalityId &&
                  task.status == Status.DONE && (
                    <Task
                      key={task.id}
                      data={task}
                      updateState={isUpdated}
                      updateHandler={updateHandler}
                    />
                  )
              ) || <p>No tasks to display...</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
