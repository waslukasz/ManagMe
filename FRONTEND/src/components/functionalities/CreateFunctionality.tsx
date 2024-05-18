import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionalityDto, PriorityType } from "../../types/FunctionalityType";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import axios from "../../api/axios";

export default function ProjectsCreate() {
  const [functionality, setFunctionality] = useState<FunctionalityDto>({
    name: "",
    description: "",
    priority: 0,
    project: localStorage.getItem("active_project")!,
  });
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const priorityRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    axios
      .post("/functionality", {
        name: functionality.name,
        description: functionality.description,
        priority: priorityRef.current?.value!,
        project: functionality.project,
      })
      .then(() => {
        navigate("/functionalities");
      })
      .catch(() => {
        setHasFailed(true);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <SubNavigation>
          <SubNavLink to={"/projects"} label="Go to projects" />
          <SubNavLink to={"/functionalities"} label="Go to functionalities" />
        </SubNavigation>

        <div className="flex justify-center mt-7 font-sans">
          <form className="inline-flex flex-col gap-1">
            <label className="font-bold">Functionality name</label>
            <input
              value={functionality.name}
              onChange={(event) =>
                setFunctionality({
                  ...functionality,
                  name: event.target.value,
                })
              }
              className="rounded border border-solid p-2 border-black"
              type="text"
            />
            {hasFailed && (
              <span className="text-sm text-red-500 italic">
                This field cannot be empty.
              </span>
            )}

            <label className="font-bold mt-2">Description</label>
            <textarea
              value={functionality.description ?? ""}
              onChange={(event) =>
                setFunctionality({
                  ...functionality,
                  description: event.target.value,
                })
              }
              className="rounded border border-solid p-2 border-black"
              cols={30}
              rows={5}
            ></textarea>

            <label className="font-bold mt-2">Priority</label>
            <select
              ref={priorityRef}
              defaultValue={PriorityType.LOW}
              name="priority"
              className="rounded border border-solid p-2 border-black"
            >
              <option value={PriorityType.LOW}>Low</option>
              <option value={PriorityType.MEDIUM}>Medium</option>
              <option value={PriorityType.HIGH}>High</option>
            </select>

            <button
              onClick={handleSubmit}
              className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors mt-2"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
