import { Task as TaskType } from "../../types/TaskTypes";
import TasksKanbanItem from "./TasksKanbanItem";

export default function TasksKanbanColumn({
  data,
  taskState,
  title,
}: {
  data: TaskType[];
  taskState: [TaskType[], React.Dispatch<React.SetStateAction<TaskType[]>>];
  title: string;
}) {
  return (
    <div className="flex flex-auto bg-gray-100 min-w-64 rounded-md">
      <div className="p-3 w-full">
        <div className="text-center text-2xl font-semibold font-mono mb-3 tracking-wider">
          {title}
        </div>
        <div className="flex flex-col gap-3">
          {data.map((task) => (
            <TasksKanbanItem key={task.id} data={task} taskState={taskState} />
          ))}
        </div>
      </div>
    </div>
  );
}
