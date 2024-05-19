import { useState } from "react";
import {
  FunctionalityDtoUpdate,
  FunctionalityEntity,
  Functionality as FunctionalityType,
} from "../../types/FunctionalityTypes";
import { format as formatDate } from "date-fns";
import axios from "../../api/axios";
import { Priority, Status } from "../../types/UtilTypes";
import {
  AcceptIcon,
  BackIcon,
  DeleteIcon,
  EditIcon,
  TaskIcon,
} from "../../assets";
import { useNavigate } from "react-router-dom";

export default function Functionality({
  data,
  functionalitiesState,
}: {
  data: FunctionalityType;
  functionalitiesState: [
    FunctionalityType[],
    React.Dispatch<React.SetStateAction<FunctionalityType[]>>
  ];
}) {
  const [functionality, setFunctionality] = useState<FunctionalityType>(data);
  const [functionalities, setFunctionalities] = functionalitiesState;
  const [formUpdate, setFormUpdate] = useState<FunctionalityDtoUpdate>(
    new FunctionalityDtoUpdate(functionality)
  );

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleUpdate() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    axios
      .patch<FunctionalityEntity>(
        `/functionality/${functionality.id}`,
        formUpdate
      )
      .then((response) => {
        console.log(response.data);
        const result: FunctionalityType = {
          ...new FunctionalityType(response.data),
          ...formUpdate,
        };
        setFunctionality(result);
        setFunctionalities((prev) =>
          prev.map((t) => (t.id == result.id ? result : t))
        );
        setIsEditing(false);
      });
  }

  async function handleCancel() {
    setFormUpdate(new FunctionalityDtoUpdate(functionality));
    setIsEditing(false);
  }

  async function handleDelete() {
    axios.delete(`/functionality/${functionality.id}`).then(() => {
      setFunctionalities((prev) =>
        prev.filter((t) => t.id != functionality.id)
      );
    });
  }

  async function handleNavigate() {
    navigate(`/tasks/${functionality.id}`);
  }

  return (
    <>
      <div className="flex flex-col p-2 w-full rounded bg-white shadow-sm font-sans drop-shadow">
        {/* Menu */}
        <div className="flex gap-0.5 p-2  rounded justify-end">
          {/* Menu -> Default */}
          {!isEditing && (
            <>
              <TaskIcon
                className="mr-auto h-5 fill-emerald-500 hover:fill-emerald-600"
                onClick={handleNavigate}
              />

              <EditIcon
                className="fill-cyan-600 hover:fill-cyan-700"
                onClick={handleUpdate}
              />

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
        </div>

        <hr className="mb-2" />

        {/* Functionality details */}
        <div className="flex flex-col flex-shrink px-1 h-full">
          {/* Functionality details -> Default */}
          {/* 
          Functionality fields to display:

          name
          description
          priority
          status
          created
          owner
        */}
          {!isEditing && (
            <>
              <div className="text-lg leading-6 font-semibold">
                {functionality.name}
              </div>
              <div className="text-sm">{functionality.description}</div>
              <div className="flex flex-col gap-0.5 text-[0.7em] mt-2">
                <span>
                  Status:{" "}
                  <span className="italic">{Status[functionality.status]}</span>
                </span>

                {functionality.owner?.id && (
                  <span>
                    Owner:{" "}
                    <span className="italic">
                      {functionality.owner.fullname}
                    </span>
                  </span>
                )}
              </div>

              <div className="text-xs mt-auto text-right text-gray-500 tracking-wide italic">
                {formatDate(functionality.created, "kk:mm:ss dd MMMM yyyy")}
              </div>
            </>
          )}

          {/* Functionality details -> Edit mode */}
          {/* 
          Used fields:

          id <- from Functionality

          name
          description
          priority
          status
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

                {/* Edit -> Status */}
                <label className="flex flex-col">
                  <span className="text-sm ml-0.5">Status</span>
                  <select
                    value={formUpdate.status}
                    onChange={(event) =>
                      setFormUpdate((prev) => ({
                        ...prev,
                        status: parseInt(event.target.value),
                      }))
                    }
                    className="border p-1 rounded outline-none w-full resize-none overflow-hidden focus:border-gray-600"
                  >
                    <option value={Status.Todo}>{Status[Status.Todo]}</option>
                    <option value={Status.Doing}>{Status[Status.Doing]}</option>
                    <option value={Status.Done}>{Status[Status.Done]}</option>
                  </select>
                </label>

                {/* Edit -> Priority */}
                <label className="flex flex-col">
                  <span className="text-sm ml-0.5">Priority</span>
                  <select
                    value={formUpdate.priority}
                    onChange={(event) =>
                      setFormUpdate((prev) => ({
                        ...prev,
                        priority: parseInt(event.target.value),
                      }))
                    }
                    className="border p-1 rounded outline-none w-full resize-none overflow-hidden focus:border-gray-600"
                  >
                    <option value={Priority.Low}>
                      {Priority[Priority.Low]}
                    </option>
                    <option value={Priority.Medium}>
                      {Priority[Priority.Medium]}
                    </option>
                    <option value={Priority.High}>
                      {Priority[Priority.High]}
                    </option>
                  </select>
                </label>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
