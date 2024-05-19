import { useEffect, useState } from "react";
import {
  Task,
  TaskDtoProceed,
  TaskDtoUpdate,
  TaskEntity,
} from "../../types/TaskTypes";

import {
  AcceptIcon,
  BackIcon,
  ContinueIcon,
  DeleteIcon,
  EditIcon,
} from "../../assets";
import axios from "../../api/axios";
import { format as formatDate, isValid as isDateValid } from "date-fns";
import { Status } from "../../types/UtilTypes";
import { User, UserEntity } from "../../types/UserTypes";

export default function TasksKanbanItem({
  data,
  tasksState,
}: {
  data: Task;
  tasksState: [Task[], React.Dispatch<React.SetStateAction<Task[]>>];
}) {
  const [task, setTask] = useState<Task>(data);
  const [tasks, setTasks] = tasksState;
  const [users, setUsers] = useState<User[]>({} as User[]);

  const [formUpdate, setFormUpdate] = useState<TaskDtoUpdate>(
    new TaskDtoUpdate(task)
  );
  const [formProceed, setFormProceed] = useState<TaskDtoProceed>(
    new TaskDtoProceed(task)
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isProceeding, setIsProceeding] = useState<boolean>(false);

  useEffect(() => {
    axios.get<UserEntity[]>("/user").then((response) => {
      const result = response.data.map((user) => new User(user));
      setUsers(result);
    });
  }, []);

  async function handleUpdate() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    axios.patch<TaskEntity>(`/task/${task.id}`, formUpdate).then((response) => {
      const result: Task = { ...new Task(response.data), ...formUpdate };
      setTask(result);
      setIsEditing(false);
    });
  }

  async function handleProceed() {
    if (!isProceeding) {
      setIsProceeding(true);
      return;
    }

    if (!task.assignedUser?.id) {
      formProceed.status = Status.Doing;
      if (!formProceed.assignedUser) formProceed.assignedUser = users[0].id;

      formProceed.start = new Date();
      axios
        .patch<TaskEntity>(`/task/${task.id}`, formProceed)
        .then((response) => {
          const result = new Task(response.data);
          setTask(result);
          setTasks((prev) => prev.map((t) => (t.id == result.id ? result : t)));
          setFormUpdate(new TaskDtoUpdate(result));
          setFormProceed(new TaskDtoProceed(result));
          setIsProceeding(false);
        });
      return;
    }

    if (!task.end) {
      formProceed.status = Status.Done;
      formProceed.end = new Date();

      axios
        .patch<TaskEntity>(`/task/${task.id}`, formProceed)
        .then((response) => {
          const result = new Task(response.data);
          setTask(result);
          setTasks((prev) => prev.map((t) => (t.id == result.id ? result : t)));
          setFormUpdate(new TaskDtoUpdate(result));
          setFormProceed(new TaskDtoProceed(result));
          setIsProceeding(false);
        });
      return;
    }
    setIsProceeding(false);
  }

  async function handleCancel() {
    setFormUpdate(new TaskDtoUpdate(task));
    setFormProceed(new TaskDtoProceed(task));
    setIsEditing(false);
    setIsProceeding(false);
  }

  async function handleDelete() {
    axios.delete(`/task/${task.id}`).then(() => {
      setTasks((prev) => prev.filter((t) => t.id != task.id));
    });
  }

  return (
    <>
      <div className="flex flex-col p-2 w-full rounded bg-white shadow-sm font-sans drop-shadow">
        {/* Menu */}
        <div className="flex gap-0.5 p-2  rounded justify-end">
          {/* Menu -> Default */}
          {!isEditing && !isProceeding && (
            <>
              {!task.end && (
                <>
                  <ContinueIcon
                    className="fill-cyan-600 hover:fill-cyan-700"
                    onClick={handleProceed}
                  />
                  <EditIcon
                    className="fill-cyan-600 hover:fill-cyan-700"
                    onClick={handleUpdate}
                  />
                </>
              )}

              <DeleteIcon
                className="fill-red-600 hover:fill-red-700"
                onClick={handleDelete}
              />
            </>
          )}

          {/* Menu -> Edit mode */}
          {isEditing && (
            <>
              <AcceptIcon
                className="fill-cyan-600 hover:fill-cyan-700"
                onClick={handleUpdate}
              />
              <BackIcon
                className="fill-red-600 hover:fill-red-700"
                onClick={handleCancel}
              />
            </>
          )}

          {/* Menu -> Proceed mode */}
          {isProceeding && (
            <>
              <AcceptIcon
                className="fill-cyan-600 hover:fill-cyan-700"
                onClick={handleProceed}
              />
              <BackIcon
                className="fill-red-600 hover:fill-red-700"
                onClick={handleCancel}
              />
            </>
          )}
        </div>

        <hr className="mb-2" />

        {/* Task details */}
        <div className="flex flex-col flex-shrink px-1">
          {/* Task details -> Default */}
          {/* 
            Task fields to display:

            name
            description
            created
            status
            start
            end
            estimated
            assignedUser
          */}
          {!isEditing && !isProceeding && (
            <>
              <div className="text-lg leading-6 font-semibold">{task.name}</div>
              <div className="text-sm">{task.description}</div>
              <div className="flex flex-col gap-0.5 text-[0.7em] mt-2">
                <span>
                  Status: <span className="italic">{Status[task.status]}</span>
                </span>
                {task.start && (
                  <span>
                    Started:{" "}
                    <span className="italic">
                      {formatDate(task.start, "dd MMMM yyyy")}
                    </span>
                  </span>
                )}

                {task.end && (
                  <span>
                    Finished:{" "}
                    <span className="italic">
                      {formatDate(task.end, "dd MMMM yyyy")}
                    </span>
                  </span>
                )}

                {task.estimated && (
                  <span>
                    Estimed finish date:{" "}
                    <span className="italic">
                      {formatDate(task.estimated, "dd MMMM yyyy")}
                    </span>
                  </span>
                )}

                {task.assignedUser?.id && (
                  <span>
                    Assigned to:{" "}
                    <span className="italic">{task.assignedUser.fullname}</span>
                  </span>
                )}
              </div>

              <div className="text-xs mt-1 text-right text-gray-500 tracking-wide italic">
                {formatDate(task.created, "kk:mm:ss dd MMMM yyyy")}
              </div>
            </>
          )}

          {/* Task details -> Edit mode */}
          {/* 
            Used fields:

            id <- from task

            name
            description
            status
            start
            end
            estimated
          */}
          {isEditing && (
            <>
              <form className="flex flex-col gap-2">
                {/* Edit -> Name */}
                <label className="flex flex-col">
                  <span className="text-sm ml-0.5">Name</span>
                  <input
                    value={formUpdate.name}
                    onChange={(event) =>
                      setFormUpdate((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="border p-1 rounded outline-none focus:border-gray-600"
                    type="text"
                  />
                </label>

                {/* Edit -> Description */}
                <label className="flex flex-col">
                  <span className="text-sm ml-0.5">Description</span>
                  <textarea
                    value={formUpdate.description ?? ""}
                    onChange={(event) => {
                      event.target.style.height = `0px`;
                      event.target.style.height = `${event.target.scrollHeight}px`;
                      setFormUpdate((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }));
                    }}
                    className="border p-1 rounded outline-none resize-none overflow-hidden focus:border-gray-600"
                    rows={3}
                  />
                </label>

                {/* Edit -> Estimated finish date */}
                <label className="flex flex-col">
                  <span className="text-sm ml-0.5">Estimated finish date</span>
                  <input
                    value={formatDate(formUpdate.estimated ?? "", "yyyy-MM-dd")}
                    onChange={(event) =>
                      isDateValid(new Date(event.target.value))
                        ? setFormUpdate({
                            ...formUpdate,
                            estimated: new Date(event.target.value),
                          })
                        : null
                    }
                    className="border p-1 rounded outline-none focus:border-gray-600"
                    type="date"
                  />
                </label>
              </form>
            </>
          )}

          {/* Task details -> Proceed mode */}
          {/* 
            Used fields:

            id <- from task

            status
            assignedUser
            start
            end
            estimated
          */}
          {isProceeding && (
            <>
              {/* Proceed -> Stage 1 (assign user, set status to Doing) */}
              {isProceeding && !task.assignedUser?.id && (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm italic">Current task:</span>
                    <div className="inline-flex flex-col w-fit my-2 rounded">
                      <span className="font-semibold text-xl mb-1">
                        {task.name}
                      </span>
                      <span>{task.description}</span>
                    </div>
                  </div>
                  <form className="my-3">
                    <span className="text-sm ml-0.5">Assign user to task:</span>
                    <label>
                      <select
                        value={formProceed.assignedUser ?? users[0].id}
                        onChange={(event) =>
                          setFormProceed((prev) => ({
                            ...prev,
                            assignedUser: event.target.value,
                          }))
                        }
                        className="border p-1 rounded outline-none w-full resize-none overflow-hidden focus:border-gray-600"
                      >
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.fullname}
                          </option>
                        ))}
                      </select>
                    </label>
                  </form>
                  <div className="italic text-sm text-right">
                    By assigning user you will change task status to "Doing".
                  </div>
                </>
              )}
              {/* Proceed -> Stage 2 (set end date, change status to Done) */}
              {isProceeding && !task.end && (
                <>
                  <span className="font-semibold leading-6">
                    Submit to mark current task as finished.
                  </span>
                  <div className="flex items-center text-xs italic">
                    If you don't want to proceed, please click{" "}
                    <BackIcon className="h-3.5 fill-red-600 pointer-events-none" />
                    .
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
