import { Project as ProjectType} from "../../types/ProjectType";
import { useRef, useState} from 'react'
import AcceptIcon from '../../assets/accept.svg'
import EditIcon from '../../assets/edit.svg'
import DeleteIcon from '../../assets/delete.svg'
import BackIcon from '../../assets/back.svg'
import { UpdateProject, DeleteProject } from "../../requests/ProjectRequest";

export default function Project({data}: {data: ProjectType}) {
  const [currentData, setCurrentData] = useState<ProjectType>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const editStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};
  const deleteStyle = {filter: 'invert(24%) sepia(30%) saturate(5752%) hue-rotate(346deg) brightness(94%) contrast(84%)'};
  const acceptStyle = {filter: 'invert(33%) sepia(79%) saturate(618%) hue-rotate(78deg) brightness(105%) contrast(87%)'};
  const backStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};

  async function editHandler() {
    setIsEditing((prevState) => !prevState);
    if (!isEditing) return;

    const updatedProject: ProjectType = {
      id: currentData.id,
      name: nameRef.current!.value,
      description: descRef.current!.value
    }

    setCurrentData(UpdateProject(updatedProject));
  }

  async function cancelEditHandler() {
    setIsEditing((prevState) => !prevState);
    return;
  }

  async function deleteHandler() {
    DeleteProject(currentData);
    setIsDeleted(true);
  }

    return (
      <>
        {!isDeleted && 
          <div className="inline-flex flex-col min-w-32 border border-solid p-2 rounded-sm">
            <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
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
              <div className="flex flex-col">
                <span className="text-xl font-bold">{currentData.name}</span>
                <span className="mt-1">{currentData.description}</span>
              </div>
            }

            {isEditing && 
              <div className="flex flex-col gap-0.5 mt-2">
                <label htmlFor="name">Name</label>
                <input className="border border-solid focus:outline-none p-0.5" type="text" defaultValue={currentData.name} ref={nameRef}/>
                <br />
                <label htmlFor="desc">Description</label>
                <textarea className="border border-solid focus:outline-none p-0.5" name="desc" defaultValue={currentData.description} ref={descRef} />
              </div>
            }
          </div>
        }
      </>
    )
  }