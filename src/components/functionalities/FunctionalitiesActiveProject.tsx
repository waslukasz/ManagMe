import { useState } from 'react'
import { Project as ProjectType } from "../../types/ProjectType";
import SelectedIcon from '../../assets/selected.svg'

export default function FunctionalitiesActiveProject({data}: {data: ProjectType}) {
  const [currentProject, setCurrentData] = useState<ProjectType>(data);
  const selectedStyle = {filter: 'invert(79%) sepia(34%) saturate(1323%) hue-rotate(329deg) brightness(104%) contrast(97%)'};

  return (
    <>
        <div className="inline-flex flex-col min-w-32 border border-solid p-2 rounded-sm">
            <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
                <img className="h-3 mr-auto self-start" style={selectedStyle} src={SelectedIcon} alt="Selected" />
            </div>
            <hr />
            <div className="flex flex-col">
              <span className="text-xl font-bold">{currentProject.name}</span>
                <span className="mt-1">{currentProject.description}</span>
            </div>
        </div>
    </>
  )
}