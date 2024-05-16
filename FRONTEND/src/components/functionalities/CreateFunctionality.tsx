import { useRef, useState } from "react";
import ProjectApi from "../../api/ProjectApi";
import FunctionalityApi from "../../api/FunctionalityApi";
import { Link, useNavigate } from "react-router-dom";
import { FunctionalityDto, PriorityType } from "../../types/FunctionalityType";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";

export default function ProjectsCreate() {
  const functionalityApi = new FunctionalityApi();
  const projectApi = new ProjectApi();
  const [functionalityData, setFunctionalityData] = useState<FunctionalityDto>({
    name: "",
    description: "",
    priority: 0,
    project: projectApi.GetActiveId()!,
    status: 0,
    owner: "",
  });
  const [createFailed, setCreateFailed] = useState<boolean>(false);

  const priorityRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (functionalityData.name == "") {
      setCreateFailed(true);
      return;
    }
    functionalityApi.Add({
      ...functionalityData,
      priority: parseInt(priorityRef.current?.value!),
    });
    navigate("/functionalities");
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
              value={functionalityData.name}
              onChange={(event) =>
                setFunctionalityData({
                  ...functionalityData,
                  name: event.target.value,
                })
              }
              className="rounded border border-solid p-2 border-black"
              type="text"
            />
            {createFailed && (
              <span className="text-sm text-red-500 italic">
                This field cannot be empty.
              </span>
            )}

            <label className="font-bold mt-2">Description</label>
            <textarea
              value={functionalityData.description ?? ""}
              onChange={(event) =>
                setFunctionalityData({
                  ...functionalityData,
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
              <option value={PriorityType.LOW}>High</option>
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
