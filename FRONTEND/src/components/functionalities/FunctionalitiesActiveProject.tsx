import { useState } from "react";
import { Project } from "../../types/ProjectTypes";
import { SelectedIcon } from "../../assets";

export default function FunctionalitiesActiveProject({
  data,
}: {
  data: Project;
}) {
  const [project, setProject] = useState<Project>(data);

  return (
    <div
      className={`flex flex-col p-2 rounded bg-white shadow-sm font-sans drop-shadow box-border border border-solid border-yellow-500`}
    >
      {/* Menu */}
      <div className="flex gap-0.5 p-2 rounded justify-end">
        {/* Menu -> Default */}
        <SelectedIcon className="fill-yellow-500 mr-auto float-start pointer-events-none shadow-none drop-shadow-none hover:shadow-none hover:drop-shadow-none rounded-none" />
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
        <div className="text-lg leading-6 font-semibold">{project.name}</div>
        <div className="text-sm">{project.description}</div>
      </div>
    </div>
  );
}
