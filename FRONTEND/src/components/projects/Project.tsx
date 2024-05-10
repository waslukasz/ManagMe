import { useState, useEffect } from 'react'
import { Project as ProjectType } from "../../types/ProjectType";
import ProjectApi from "../../api/ProjectApi";

import AcceptIcon from '../../assets/accept.svg'
import EditIcon from '../../assets/edit.svg'
import DeleteIcon from '../../assets/delete.svg'
import BackIcon from '../../assets/back.svg'
import SelectedIcon from '../../assets/selected.svg'
import NotSelectedIcon from '../../assets/notselected.svg'

export default function Project({data, updateState, updateHandler}: {data: ProjectType, updateState:any, updateHandler:any}) {
  const projectApi = new ProjectApi();
  const [currentProject, setCurrentProject] = useState<ProjectType>(data);
  const [projectData, setProjectData] = useState<ProjectType>(currentProject);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(projectApi.GetActiveId() == currentProject.id);

  const editStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};
  const deleteStyle = {filter: 'invert(24%) sepia(30%) saturate(5752%) hue-rotate(346deg) brightness(94%) contrast(84%)'};
  const acceptStyle = {filter: 'invert(33%) sepia(79%) saturate(618%) hue-rotate(78deg) brightness(105%) contrast(87%)'};
  const backStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};
  const selectedStyle = {filter: 'invert(79%) sepia(34%) saturate(1323%) hue-rotate(329deg) brightness(104%) contrast(97%)'};

  useEffect(() => {
    setIsActive(projectApi.GetActiveId() == currentProject.id);
  }, [updateState])

  async function editHandler() {
    if(projectData.name == '') return;
    setIsEditing((prevState) => !prevState);
    if (!isEditing) return;
    setCurrentProject(await projectApi.Update(projectData));
  }

  async function cancelEditHandler() {
    setProjectData(currentProject);
    setIsEditing((prevState) => !prevState);
    return;
  }

  async function deleteHandler() {
    await projectApi.Delete(currentProject);
    if (isActive) updateHandler();
    setIsDeleted(true);
    updateHandler();
  }

  async function selectHandler() {
    projectApi.SetActive(currentProject);
    updateHandler()
  }

  return (
    <>
      {!isDeleted && 
        <div className={`inline-flex flex-col min-w-32 p-3 rounded-md font-sans shadow-md border border-solid ${!isActive && "border-gray-100" || "border-yellow-500"}`}>
          <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2 select-none">
            {isActive && 
              <img className="h-4 mr-auto self-start" style={selectedStyle} src={SelectedIcon} alt="Selected" />
            }

            {!isActive && 
              <img className="h-4 cursor-pointer mr-auto self-start select-none" onClick={selectHandler} style={selectedStyle} src={NotSelectedIcon} alt="Selected" />
            }

            {!isEditing &&
              <>
                <img className="h-5 cursor-pointer" style={editStyle} src={EditIcon} alt="Edit" onClick={editHandler} />
                <img className="h-5 cursor-pointer" style={deleteStyle} src={DeleteIcon} alt="Delete" onClick={deleteHandler}/>
              </>
            }

            {isEditing &&
              <>
                <img className="h-5 cursor-pointer" style={acceptStyle} src={AcceptIcon} alt="Accept" onClick={editHandler} />
                <img className="h-5 cursor-pointer" style={backStyle} src={BackIcon} alt="Cancel" onClick={cancelEditHandler} />
              </>
            }
          </div>
          <hr />
          {!isEditing &&
            <div className="flex flex-col pt-1">
              <span className="text-xl font-bold">{currentProject.name}</span>
              <span className="text-xs mt-1">{currentProject.description}</span>
            </div>
          }

          {isEditing && 
            <div className="flex flex-col gap-0.5 mt-2">
              <label className='select-none text-sm font-bold'>Project name</label>
              <input value={projectData.name} onChange={(event) => setProjectData({...projectData, name: event.target.value})} className="border border-solid focus:outline-none p-1 rounded" type="text"/>
              <br />
              <label className='select-none text-sm font-bold'>Description</label>
              <textarea value={projectData.description} onChange={(event) => setProjectData({...projectData, description: event.target.value})} className="border border-solid focus:outline-none p-1 rounded" />
            </div>
          }
        </div>
      }
    </>
  )
}