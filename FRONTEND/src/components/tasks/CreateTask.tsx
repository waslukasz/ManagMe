import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format as formatDate, isValid as isDateValid } from "date-fns";
import SubNavigation from "../navigation/SubNavigation";
import SubNavLink from "../navigation/SubNavLink";
import { TaskDtoCreate } from "../../types/TaskTypes";
import axios from "../../api/axios";

export default function ProjectsCreate() {
  const { functionalityId } = useParams();

  const [form, setForm] = useState<TaskDtoCreate>(
    new TaskDtoCreate(functionalityId!)
  );
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(form);
    axios
      .post("/task", form)
      .then(() => {
        navigate("/tasks/" + functionalityId);
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
          <SubNavLink to={"/tasks/" + functionalityId} label="Go to tasks" />
        </SubNavigation>

        <div className="flex justify-center mt-7 font-sans">
          <form className="inline-flex flex-col gap-1">
            <label className="font-bold">Task name</label>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              className="rounded border border-solid p-2 border-black"
              type="text"
              name="name"
            />
            {hasFailed && (
              <span className="text-sm text-red-500 italic">
                This field cannot be empty.
              </span>
            )}

            <label className="font-bold mt-2">Description</label>
            <textarea
              required
              value={form.description ?? ""}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="rounded border border-solid p-2 border-black"
              name="desc"
              id=""
              cols={30}
              rows={5}
            ></textarea>

            <label className="font-bold mt-2">Estimated finish date</label>
            <input
              value={formatDate(form.estimated ?? "", "yyyy-MM-dd")}
              onChange={(event) =>
                isDateValid(new Date(event.target.value))
                  ? setForm({
                      ...form,
                      estimated: new Date(event.target.value),
                    })
                  : null
              }
              type="date"
              name="estDate"
              className="rounded border border-solid p-2 border-black"
            />

            <button
              onClick={handleSubmit}
              className="text-green-600 border-solid border border-green-600 mt-2 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
