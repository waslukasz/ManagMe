import { useState } from 'react'
import { Project as ProjectType } from "../../types/ProjectType";
import SelectedIcon from '../../assets/selected.svg'

export default function FunctionalitiesActiveProject({data}: {data: ProjectType}) {
  const [currentProject, setCurrentProject] = useState<ProjectType>(data);
  const selectedStyle = {filter: 'invert(79%) sepia(34%) saturate(1323%) hue-rotate(329deg) brightness(104%) contrast(97%)'};

  return (
    <>
        <div className="inline-flex flex-col min-w-52 p-3 rounded-md font-sans shadow-md border border-solid border-yellow-500">
            <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
                <img className="h-4 mr-auto self-start" style={selectedStyle} src={SelectedIcon} alt="Selected" />
            </div>
            <hr />
            <div className="flex flex-col pt-1">
              <span className="text-xl font-bold">{currentProject.name}</span>
              <span className="text-xs mt-1">{currentProject.description}</span>
            </div>
        </div>
    </>
  )
}