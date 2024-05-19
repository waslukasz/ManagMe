import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";
import { TaskEntity, Task as TaskType } from "../../types/TaskTypes";
import TasksKanban from "./TasksKanban";

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
          <SubNavLink to={"/projects"} label="Projects" />
          <SubNavLink to={"/functionalities"} label="Functionalities" />
          <SubNavLink
            to={"/tasks/create/" + functionalityId}
            label="Add task"
          />
        </SubNavigation>

        <span className="text-4xl mt-5 ml-3">Tasks</span>
        {isFetching && (
          <p className="text-center text-2xl tracking-wider">
            Loading content...
          </p>
        )}

        {!isFetching && tasks.length > 0 && <TasksKanban data={tasks} />}
      </div>
    </>
  );
}
