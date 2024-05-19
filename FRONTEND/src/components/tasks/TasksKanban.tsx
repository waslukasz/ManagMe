import { useEffect, useState } from "react";
import { Task } from "../../types/TaskTypes";
import { Status } from "../../types/UtilTypes";
import TasksKanbanColumn from "./TasksKanbanColumn";

type TaskKanban = {
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export default function TasksKanban({ data }: { data: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [kanban, setKanban] = useState<TaskKanban>(getKanban());

  function getKanban(): TaskKanban {
    const todo = tasks.filter((task) => task.status == Status.Todo) as Task[];
    const doing = tasks.filter((task) => task.status == Status.Doing) as Task[];
    const done = tasks.filter((task) => task.status == Status.Done) as Task[];
    return { todo: todo, doing: doing, done: done } as TaskKanban;
  }

  useEffect(() => {
    setKanban(getKanban());
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 w-full p-2 gap-3 lg:grid-cols-3">
      <TasksKanbanColumn
        data={kanban?.todo}
        title="Todos"
        taskState={[tasks, setTasks]}
      />
      <TasksKanbanColumn
        data={kanban?.doing}
        title="Doing"
        taskState={[tasks, setTasks]}
      />
      <TasksKanbanColumn
        data={kanban?.done}
        title="Done"
        taskState={[tasks, setTasks]}
      />
    </div>
  );
}
