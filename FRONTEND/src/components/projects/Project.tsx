import { useState } from "react";
import axios from "../../api/axios";
import {
  ProjectDto,
  ProjectEntity,
  Project as ProjectType,
} from "../../types/ProjectTypes";

import {
  AcceptIcon,
  BackIcon,
  DeleteIcon,
  EditIcon,
  NotSelectedIcon,
  SelectedIcon,
} from "../../assets";

export default function Project({
  data,
  projectsState,
  activeProjectState,
}: {
  data: ProjectType;
  projectsState: [
    ProjectType[],
    React.Dispatch<React.SetStateAction<ProjectType[]>>
  ];
  activeProjectState: [
    ProjectType,
    React.Dispatch<React.SetStateAction<ProjectType>>
  ];
}) {
  const [project, setProject] = useState<ProjectType>(data);
  const [projects, setProjects] = projectsState;
  const [activeProject, setActiveProject] = activeProjectState;

  const [formUpdate, setFormUpdate] = useState<ProjectDto>(
    new ProjectDto(project)
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleUpdate() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!formUpdate.name) return;

    if (
      formUpdate.name == project.name &&
      formUpdate.description == formUpdate.description
    ) {
      setIsEditing(false);
      return;
    }

    axios
      .patch<ProjectEntity>(`/project/${project.id}`, formUpdate)
      .then((response) => {
        const result = { ...new ProjectType(response.data), ...formUpdate };
        setProject(result);
        setIsEditing(false);
      });
  }

  async function handleCancel() {
    setFormUpdate(new ProjectDto(project));
    setIsEditing(false);
  }

  async function handleDelete() {
    axios.delete(`/project/${project.id}`).then(() => {
      setProjects((prev) => prev.filter((p) => p.id != project.id));
    });
  }

  async function handleSelect() {
    localStorage.setItem("active_project", project.id);
    setActiveProject(project);
  }

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded bg-white shadow-sm font-sans drop-shadow box-border border border-solid ${
          (project.id == activeProject.id && "border-yellow-500") ||
          "border-gray-100"
        }`}
      >
        {/* Menu */}
        <div className="flex gap-0.5 p-2 rounded justify-end">
          {/* Menu -> Default */}
          {!isEditing && (
            <>
              {(project.id == activeProject.id && (
                <SelectedIcon className="fill-yellow-500 mr-auto float-start shadow-none drop-shadow-none hover:shadow-none hover:drop-shadow-none rounded-none pointer-events-none" />
              )) || (
                <NotSelectedIcon
                  onClick={handleSelect}
                  className="fill-yellow-500 mr-auto hover:shadow-none hover:drop-shadow-none shadow-none drop-shadow-none rounded-none"
                />
              )}

              <div className="flex">
                <EditIcon
                  className="fill-cyan-600 hover:fill-cyan-700"
                  onClick={handleUpdate}
                />

                <DeleteIcon
                  className="fill-red-600 hover:fill-red-700"
                  onClick={handleDelete}
                />
              </div>
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

        {/* Project details */}
        <div className="flex flex-col flex-shrink px-1">
          {/* Project details -> Default */}
          {/* 
            Project fields to display:

            name
            description
          */}
          {!isEditing && (
            <>
              <div className="text-lg leading-6 font-semibold">
                {project.name}
              </div>
              <div className="text-sm">{project.description}</div>
            </>
          )}

          {/* Project details -> Edit mode */}
          {/* 
            Used fields:

            id <- from project

            name
            description
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
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
