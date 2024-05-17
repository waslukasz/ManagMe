import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectDto } from "../../types/ProjectType";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";

export default function ProjectsCreate() {
  const [project, setProject] = useState<ProjectDto>({
    name: "",
    description: "",
  });
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    axios
      .post("/project", {
        name: project.name,
        description: project.description,
      })
      .then((response) => {
        navigate("/projects");
      })
      .catch((error) => {
        setHasFailed(true);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          <SubNavLink to={"/projects"} label="Go back to all projects" />
        </SubNavigation>

        <div className="flex justify-center mt-7 font-sans">
          <form className="inline-flex flex-col gap-1">
            <label className="font-bold">Project name</label>
            <input
              value={project.name}
              onChange={(event) =>
                setProject({ ...project, name: event.target.value })
              }
              className="rounded border border-solid p-2 border-black"
              type="text"
            />
            {hasFailed && (
              <span className="text-sm text-red-500 italic">
                This field cannot be empty.
              </span>
            )}

            <label className="font-bold mt-3">Description</label>
            <textarea
              value={project.description ?? ""}
              onChange={(event) =>
                setProject({
                  ...project,
                  description: event.target.value,
                })
              }
              className="rounded border border-solid p-2 border-black"
              cols={30}
              rows={5}
            ></textarea>

            <button
              onClick={handleSubmit}
              className="text-green-600 border-solid border border-green-600 p-2 mt-3 rounded font-mono font-bold hover:bg-green-600 hover:text-white transition-colors"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
