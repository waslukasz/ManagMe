import { useState } from "react";
import { Project as ProjectType } from "../../types/ProjectType";

import AcceptIcon from "../../assets/accept.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delete.svg";
import BackIcon from "../../assets/back.svg";
import SelectedIcon from "../../assets/selected.svg";
import NotSelectedIcon from "../../assets/notselected.svg";
import axios from "../../api/axios";

type ProjectDto = {
  name: string;
  description: string | null;
};

export default function Project({
  data,
  updateState,
  updateHandler,
}: {
  data: ProjectType;
  updateState: any;
  updateHandler: any;
}) {
  const [project, setProject] = useState<ProjectType>(data);
  const [form, setForm] = useState<ProjectDto>({
    name: project.name,
    description: project.description,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(
    localStorage.getItem("active_project") == project._id
  );

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
  const selectedStyle = {
    filter:
      "invert(79%) sepia(34%) saturate(1323%) hue-rotate(329deg) brightness(104%) contrast(97%)",
  };

  async function handleUpdate() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!form.name) return;

    if (form.name == project.name && form.description == form.description) {
      setIsEditing(false);
      return;
    }

    axios
      .patch<ProjectType>(`/project/${project._id}`, form)
      .then(() => {
        setProject({ ...project, ...form });
        setIsEditing(false);
      })
      .catch(() => {});
  }

  async function handleCancel() {
    setForm({
      name: project.name,
      description: project.description,
    });
    setIsEditing(false);
  }

  async function handleDelete() {
    axios.delete(`/project/${project._id}`).then(() => {
      if (isActive) localStorage.removeItem("active_project");
      updateHandler();
    });
  }

  async function handleSelect() {
    localStorage.setItem("active_project", project._id);
    updateHandler();
  }

  return (
    <>
      <div
        className={`inline-flex flex-col min-w-32 p-3 rounded-md font-sans shadow-md border border-solid ${
          (!isActive && "border-gray-100") || "border-yellow-500"
        }`}
      >
        <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2 select-none">
          {isActive && (
            <img
              className="h-4 mr-auto self-start"
              style={selectedStyle}
              src={SelectedIcon}
              alt="Selected"
            />
          )}

          {!isActive && (
            <img
              className="h-4 cursor-pointer mr-auto self-start select-none"
              onClick={handleSelect}
              style={selectedStyle}
              src={NotSelectedIcon}
              alt="Selected"
            />
          )}

          {!isEditing && (
            <>
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
        </div>
        <hr />
        {!isEditing && (
          <div className="flex flex-col pt-1">
            <span className="text-xl font-bold">{project.name}</span>
            <span className="text-xs mt-1">{project.description}</span>
          </div>
        )}

        {isEditing && (
          <div className="flex flex-col gap-0.5 mt-2">
            <label className="select-none text-sm font-bold">
              Project name
            </label>
            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              className="border border-solid focus:outline-none p-1 rounded"
              type="text"
            />
            <br />
            <label className="select-none text-sm font-bold">Description</label>
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
          </div>
        )}
      </div>
    </>
  );
}
