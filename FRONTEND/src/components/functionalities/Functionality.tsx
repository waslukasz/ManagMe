import { useEffect, useRef, useState } from "react";
import { Functionality as FunctionalityType } from "../../types/FunctionalityType";

import AcceptIcon from "../../assets/accept.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delete.svg";
import BackIcon from "../../assets/back.svg";
import { Link } from "react-router-dom";
import { format as formatDate } from "date-fns";
import axios from "../../api/axios";

//TODO : GODZINY FORMAT 24H

export default function Functionality({
  data,
  updateState,
  updateHandler,
}: {
  data: FunctionalityType;
  updateState: any;
  updateHandler: any;
}) {
  const [functionality, setFunctionality] = useState<FunctionalityType>(data);
  const [functionalityEdited, setFunctionalityEdited] =
    useState<FunctionalityType>(functionality);

  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const priorityRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {}, [updateState]);

  async function editHandler() {
    if (functionalityEdited.name == "") return;
    setIsEditing((prevState) => !prevState);
    if (!isEditing) return;
    await axios
      .patch(`/functionality/${functionality._id}`, {
        name: functionalityEdited.name,
        description: functionalityEdited.description,
        priority: parseInt(priorityRef.current?.value!),
        status: parseInt(statusRef.current?.value!),
      })
      .then(() => {
        updateHandler();
      });
  }

  async function cancelEditHandler() {
    setFunctionalityEdited(functionality);
    setIsEditing((prevState) => !prevState);
    return;
  }

  async function deleteHandler() {
    await axios.delete(`/functionality/${functionality._id}`).then(() => {
      updateHandler();
    });
  }

  return (
    <>
      <div className="inline-flex flex-col min-w-32 shadow border border-solid border-gray-100 p-3 rounded font-sans justify-between">
        <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
          {!isEditing && (
            <>
              <img
                className="h-5 cursor-pointer"
                style={editStyle}
                src={EditIcon}
                alt="Edit"
                onClick={editHandler}
              />
              <img
                className="h-5 cursor-pointer"
                style={deleteStyle}
                src={DeleteIcon}
                alt="Delete"
                onClick={deleteHandler}
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
                onClick={editHandler}
              />
              <img
                className="h-5 cursor-pointer"
                style={backStyle}
                src={BackIcon}
                alt="Cancel"
                onClick={cancelEditHandler}
              />
            </>
          )}
        </div>
        <hr />

        {!isEditing && (
          <>
            <div className="flex flex-col flex-grow">
              <div className="flex flex-col flex-grow">
                <span className="text-xl font-bold">{functionality.name}</span>
                <span className="text-sm mt-1">
                  {functionality.description}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex flex-col">
                <span className="text-xs text-right italic mt-1">
                  Priority: {functionality.priority == 0 && <>Low</>}{" "}
                  {functionality.priority == 1 && <>Medium</>}
                  {functionality.priority == 2 && <>High</>}
                </span>
                <span className="text-xs text-right italic">
                  Status: {functionality.status == 0 && <>TODO</>}{" "}
                  {functionality.status == 1 && <>Doing</>}
                  {functionality.status == 2 && <>Done</>}
                </span>

                <span className="text-xs text-right italic">
                  Owner:{" "}
                  {functionality.owner
                    ? `${functionality.owner.name} ${functionality.owner.surname}`
                    : "none"}
                </span>

                <span className="text-xs text-right italic">
                  {formatDate(
                    new Date(functionality.created),
                    "hh:mm:ss - dd MMMM yyyy"
                  )}
                </span>
                <Link
                  to={"/tasks/" + functionality._id}
                  className="inline-flex self-end text-sm hover:underline text-blue-400 cursor-pointer select-none"
                >
                  Show tasks
                </Link>
              </div>
            </div>
          </>
        )}

        {isEditing && (
          <>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-bold">Functionality name</label>
              <input
                value={functionalityEdited.name}
                onChange={(event) =>
                  setFunctionalityEdited({
                    ...functionalityEdited,
                    name: event.target.value,
                  })
                }
                className="border border-solid focus:outline-none p-1 rounded"
                type="text"
              />

              <label className="text-sm font-bold mt-2">Description</label>
              <textarea
                value={functionalityEdited.description ?? ""}
                onChange={(event) =>
                  setFunctionalityEdited({
                    ...functionalityEdited,
                    description: event.target.value,
                  })
                }
                className="border border-solid focus:outline-none p-1 rounded"
              />

              <label className="text-sm font-bold mt-2">Priority</label>
              <select
                ref={priorityRef}
                defaultValue={functionality.priority}
                className="rounded border border-solid border-black"
              >
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>

              <label className="text-sm font-bold mt-2">Status:</label>
              <select
                ref={statusRef}
                defaultValue={functionality.status}
                name="status"
                className="rounded border border-solid border-black"
              >
                <option value="0">TODO</option>
                <option value="1">Doing</option>
                <option value="2">Done</option>
              </select>
            </div>
          </>
        )}
      </div>
    </>
  );
}
