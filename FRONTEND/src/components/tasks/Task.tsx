import { useEffect, useState } from "react";
import AcceptIcon from "../../assets/accept.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delete.svg";
import BackIcon from "../../assets/back.svg";
import Continue from "../../assets/continue.svg";
import { format as formatDate, isValid as isDateValid } from "date-fns";
import axios from "../../api/axios";
import {
  Task as TaskType,
  TaskDtoUpdate,
  TaskEntity,
} from "../../types/TaskTypes";
import { User, UserEntity } from "../../types/UserTypes";
import { Status } from "../../types/UtilTypes";

export default function Task({
  data,
  updateState,
  updateHandler,
}: {
  data: TaskType;
  updateState: any;
  updateHandler: any;
}) {
  const [task, setTask] = useState<TaskType>(data);
  const [form, setForm] = useState<TaskDtoUpdate>(new TaskDtoUpdate(task));

  const [isProceeding, setIsProceeding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const editStyle = {
    filter:
      "invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)",
  };
  const deleteStyle = {
    filter:
      "invert(24%) sepia(30%) saturate(5752%) hue-rotate(346deg) brightness(94%) contrast(84%)",
  };
  const acceptStyle = {
    filter:
      "invert(33%) sepia(79%) saturate(618%) hue-rotate(78deg) brightness(105%) contrast(87%)",
  };
  const backStyle = {
    filter:
      "invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)",
  };
  const proceedStyle = {
    filter:
      "invert(68%) sepia(7%) saturate(1563%) hue-rotate(24deg) brightness(94%) contrast(85%)",
  };
  const acceptProceedStyle = {
    filter:
      "invert(90%) sepia(30%) saturate(430%) hue-rotate(12deg) brightness(89%) contrast(94%)",
  };

  useEffect(() => {}, [updateState]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    setIsFetching(true);
    try {
      axios.get<UserEntity[]>("/user").then((response) => {
        setUsers(response.data.map((entity) => new User(entity)));
      });
    } catch (error) {}
    setIsFetching(false);
  }

  async function handleUpdate() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!form.name || isNaN(form.status)) return;
    if (form == new TaskDtoUpdate(task)) return;

    await axios.patch<TaskEntity>(`/task/${task.id}`, form).then((response) => {
      const result = new TaskType(response.data);
      setTask({ ...result, ...form });
      setIsEditing(false);
      return;
    });
  }

  // async function editHandler() {
  //   if (taskData.name == "") return;
  //   setIsEditing((prevState) => !prevState);
  //   if (!isEditing) return;
  //   setCurrentTask(await taskApi.Update(taskData));
  //   updateHandler();
  // }

  async function handleProceed() {
    if (!isProceeding) {
      setIsProceeding(true);
      return;
    }

    // STAGE 1
    if (false) {
      axios.patch<TaskEntity>("/task", form).then((response) => {
        const result = new TaskType(response.data);
        setTask(result);
        setForm(new TaskDtoUpdate(result));
        setIsProceeding(false);
        return;
      });
    }
  }

  // async function proceedHandler() {
  //   if (currentTask.assignedUser?._id == null) {
  //     setCurrentTask(
  //       await taskApi.Update({
  //         ...taskData,
  //         assignedUser: assignedUserRef.current?.value!,
  //         status: StatusType.DOING,
  //         startTime: new Date(),
  //       })
  //     );
  //     updateHandler();
  //     return;
  //   }

  //   if (currentTask.endTime == null) {
  //     setCurrentTask(
  //       await taskApi.Update({
  //         ...taskData,
  //         endTime: new Date(),
  //         status: StatusType.DONE,
  //       })
  //     );
  //     updateHandler();
  //     return;
  //   }
  // }

  async function handleCancel() {
    setForm(new TaskDtoUpdate(task));
    setIsEditing(false);
    setIsProceeding(false);
  }

  // async function cancelHandler() {
  //   setTaskData(currentTask);
  //   setIsProceeding(false);
  //   setIsEditing(false);
  //   return;
  // }

  async function handleDelete() {
    axios.delete(`/task/${task.id}`).then(() => {
      updateHandler();
    });
  }

  // async function deleteHandler() {
  //   await taskApi.Delete(currentTask);
  //   setIsDeleted(true);
  //   updateHandler();
  // }

  return (
    <>
      {!isDeleted && (
        <div className="inline-flex flex-col min-w-32 border border-solid border-gray-200 p-2 rounded shadow font-sans">
          <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
            {!isEditing && !isProceeding && (
              <>
                {task.end == null && (
                  <img
                    className="h-5 cursor-pointer"
                    style={proceedStyle}
                    src={Continue}
                    alt="Continue"
                    onClick={handleProceed}
                  />
                )}
                <img
                  className="h-5 cursor-pointer"
                  style={editStyle}
                  src={EditIcon}
                  alt="Edit"
                  onClick={handleUpdate}
                />
                <img
                  className="h-5 cursor-pointer"
                  style={deleteStyle}
                  src={DeleteIcon}
                  alt="Delete"
                  onClick={handleDelete}
                />
              </>
            )}

            {isEditing && (
              <>
                <img
                  className="h-5 cursor-pointer"
                  style={acceptStyle}
                  src={AcceptIcon}
                  alt="Accept"
                  onClick={handleUpdate}
                />
                <img
                  className="h-5 cursor-pointer"
                  style={backStyle}
                  src={BackIcon}
                  alt="Cancel"
                  onClick={handleCancel}
                />
              </>
            )}

            {isProceeding && (
              <>
                <img
                  className="h-5 cursor-pointer"
                  style={acceptProceedStyle}
                  src={AcceptIcon}
                  alt="Accept"
                  onClick={handleProceed}
                />
                <img
                  className="h-5 cursor-pointer"
                  style={backStyle}
                  src={BackIcon}
                  alt="Cancel"
                  onClick={handleCancel}
                />
              </>
            )}
          </div>
          <hr />

          {isProceeding && task.assignedUser?.id == null && (
            <>
              <div>
                <div className="flex flex-col gap-0.5 mt-2">
                  <label className="font-bold text-sm">Assign user</label>
                  <select className="border border-solid rounded focus:outline-none p-0.5">
                    {!isFetching && (
                      <>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} {user.surname}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <span className="mt-2 text-right text-xs italic text-gray-400">
                    By assigning user you will change task status to "Doing".
                  </span>
                </div>
              </div>
              <hr className="mt-3" />
            </>
          )}

          {isProceeding && task.assignedUser && (
            <>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <span>Click accept button to mark this task as done.</span>
                <span>
                  If you don't want to proceed, please click the back button.
                </span>
              </div>
              <hr className="mt-3" />
            </>
          )}

          {!isEditing && (
            <>
              <div className="flex flex-col">
                <span className="text-xl font-bold">{task.name}</span>
                <span className="mt-1">{task.description}</span>
                <hr className="mt-3" />
                <span className="text-xs italic">
                  Status: {task.status == 0 && <>TODO</>}{" "}
                  {task.status == 1 && <>Doing</>}
                  {task.status == 2 && <>Done</>}
                </span>
                <span className="text-xs italic">
                  Started:{" "}
                  {task.start ? formatDate(task.start, "dd/MM/yyyy") : "-"}
                </span>
                <span className="text-xs italic">
                  Finished:{" "}
                  {task.end ? formatDate(task.end, "dd/MM/yyyy") : "-"}
                </span>
                {task.end == null && (
                  <span className="text-xs italic">
                    Estimated finish time:{" "}
                    {task.estimated
                      ? formatDate(task.estimated, "dd/MM/yyyy")
                      : "-"}
                  </span>
                )}
                <span className="text-xs italic">
                  Assigned user: {task.assignedUser?.name}{" "}
                  {task.assignedUser?.surname}
                </span>
                <span className="text-xs text-right italic">
                  {formatDate(task.created, "kk:mm:ss - dd MMMM yyyy")}
                </span>
              </div>
            </>
          )}

          {isEditing && (
            <>
              <div className="flex flex-col gap-0.5 mt-2">
                <label className="text-sm font-bold">Name</label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="border border-solid focus:outline-none p-1 rounded"
                  type="text"
                />
                <br />
                <label className="text-sm font-bold">Description</label>
                <textarea
                  value={form.description ?? ""}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  className="border border-solid focus:outline-none p-1 rounded"
                />
                {task.status != Status.DONE && (
                  <>
                    <br />
                    <label className="text-sm font-bold">
                      Estimated finish date
                    </label>
                    <input
                      value={
                        form.estimated
                          ? formatDate(form.estimated, "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(event) =>
                        isDateValid(
                          new Date(event.target.value)
                            ? setForm({
                                ...form,
                                estimated: new Date(event.target.value),
                              })
                            : null
                        )
                      }
                      type="date"
                      className="border border-solid focus:outline-none p-1 rounded"
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
