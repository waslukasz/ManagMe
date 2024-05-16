import { useEffect, useRef, useState } from 'react'
import AcceptIcon from '../../assets/accept.svg'
import EditIcon from '../../assets/edit.svg'
import DeleteIcon from '../../assets/delete.svg'
import BackIcon from '../../assets/back.svg'
import Continue from '../../assets/continue.svg'
import TaskApi from '../../api/TaskApi';
import { StatusType, Task as TaskType } from '../../types/TaskType';
import { User as UserType } from '../../types/UserType'
import AuthApi from '../../api/AuthApi'
import { format as formatDate, isValid as isDateValid } from 'date-fns'

export default function Task({data, updateState, updateHandler}: {data: TaskType, updateState:any, updateHandler:any}) {
  const taskApi = new TaskApi;
  const [currentTask, setCurrentTask] = useState<TaskType>(data);
  const [taskData, setTaskData] = useState<TaskType>(currentTask);

  const [isProceeding, setIsProceeding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const authApi = new AuthApi;
  const [users, setUsers] = useState<UserType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const editStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};
  const deleteStyle = {filter: 'invert(24%) sepia(30%) saturate(5752%) hue-rotate(346deg) brightness(94%) contrast(84%)'};
  const acceptStyle = {filter: 'invert(33%) sepia(79%) saturate(618%) hue-rotate(78deg) brightness(105%) contrast(87%)'};
  const backStyle = {filter: 'invert(32%) sepia(72%) saturate(552%) hue-rotate(150deg) brightness(95%) contrast(85%)'};
  const proceedStyle = {filter: 'invert(68%) sepia(7%) saturate(1563%) hue-rotate(24deg) brightness(94%) contrast(85%)'};
  const acceptProceedStyle = {filter: 'invert(90%) sepia(30%) saturate(430%) hue-rotate(12deg) brightness(89%) contrast(94%)'};

  const assignedUserRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
  }, [updateState])

  useEffect(() => {
    fetchAllUsernames();
  }, [])

  async function fetchAllUsernames() {
    setIsFetching(true);
    try {
        let users = (await authApi.GetAll());
        setUsers(users);
    } catch (error) {}
    setIsFetching(false);
  }

  async function editHandler() {
    if(taskData.name == '') return;
    setIsEditing((prevState) => !prevState);
    if (!isEditing) return;
    setCurrentTask(await taskApi.Update(taskData));
    updateHandler();
  }

  async function proceedHandler() {
    setIsProceeding((prevState) => !prevState);
    if (!isProceeding) return;

    if(currentTask.assignedUserId == null) {
      setCurrentTask(await taskApi.Update({...taskData, assignedUserId: assignedUserRef.current?.value!, status: StatusType.DOING, startTime: new Date()}));
      updateHandler();
      return;
    }

    if(currentTask.endTime == null) {
      setCurrentTask(await taskApi.Update({...taskData, endTime: new Date(), status: StatusType.DONE}));
      updateHandler();
      return;
    }
  }

  async function cancelHandler() {
    setTaskData(currentTask);
    setIsProceeding(false);
    setIsEditing(false);
    return;
  }

  async function deleteHandler() {
    await taskApi.Delete(currentTask);
    setIsDeleted(true);
    updateHandler();
  }

  return (
    <>
      {!isDeleted && 
        <div className="inline-flex flex-col min-w-32 border border-solid border-gray-200 p-2 rounded shadow font-sans">
        <div className="flex items-baseline gap-0.5 rounded-full justify-end mb-2">
          {!isEditing && !isProceeding &&
            <>
              {currentTask.endTime == null && <img className="h-5 cursor-pointer" style={proceedStyle} src={Continue} alt="Continue" onClick={proceedHandler} />}
              <img className="h-5 cursor-pointer" style={editStyle} src={EditIcon} alt="Edit" onClick={editHandler} />
              <img className="h-5 cursor-pointer" style={deleteStyle} src={DeleteIcon} alt="Delete" onClick={deleteHandler}/>
            </>
          }

          {isEditing &&
            <>
              <img className="h-5 cursor-pointer" style={acceptStyle} src={AcceptIcon} alt="Accept" onClick={editHandler} />
              <img className="h-5 cursor-pointer" style={backStyle} src={BackIcon} alt="Cancel" onClick={cancelHandler} />
            </>
          }

          {isProceeding &&
            <>
              <img className="h-5 cursor-pointer" style={acceptProceedStyle} src={AcceptIcon} alt="Accept" onClick={proceedHandler} />
              <img className="h-5 cursor-pointer" style={backStyle} src={BackIcon} alt="Cancel" onClick={cancelHandler} />
            </>
          }

        </div>
        <hr />

        {isProceeding && currentTask.assignedUserId == null &&
          <>
            <div>
              <div className="flex flex-col gap-0.5 mt-2">
                <label className='font-bold text-sm'>Assign user</label>
                <select ref={assignedUserRef} className="border border-solid rounded focus:outline-none p-0.5">
                  {!isFetching &&
                    <>
                      {users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                    </>
                  }
                </select>
                <span className='mt-2 text-right text-xs italic text-gray-400'>By assigning user you will change task status to "Doing".</span>
              </div>
            </div>
            <hr className='mt-3' />
          </>
        }

        {isProceeding && currentTask.assignedUserId != null &&
          <>
            <div className='mt-2 flex flex-col gap-1 text-sm'>
              <span>Click accept button to mark this task as done.</span>
              <span>If you don't want to proceed, please click the back button.</span>
            </div>
            <hr className='mt-3' />
          </>
        }

        {!isEditing &&
          <>
            <div className="flex flex-col">
              <span className="text-xl font-bold">{currentTask.name}</span>
              <span className="mt-1">{currentTask.description}</span>
              <hr className='mt-3' />
              <span className='text-xs italic'>Status: {currentTask.status == 0 && <>TODO</>} {currentTask.status == 1 && <>Doing</>}{currentTask.status == 2 && <>Done</>}</span>
              <span className='text-xs italic'>Started: { currentTask.startTime ? formatDate(currentTask.startTime, "dd/MM/yyyy") : '-'}</span>
              <span className='text-xs italic'>Finished: { currentTask.endTime ? formatDate(currentTask.endTime, "dd/MM/yyyy") : '-'}</span>
              {currentTask.endTime == null && <span className='text-xs italic'>Estimated finish time:  {currentTask.estimatedTime ? formatDate(currentTask.estimatedTime, "dd/MM/yyyy") : '-'}</span>}
              <span className='text-xs italic'>Assigned user: {updateState && currentTask.assignedUserId ? users.find(u => u.id == currentTask.assignedUserId)?.username : 'not assigned'}</span>
              <span className='text-xs text-right italic'>{formatDate(currentTask.createdTimestamp, "hh:mm:ss - dd MMMM yyyy")}</span>
            </div>
          </>
        }

        {isEditing && 
          <>
            <div className="flex flex-col gap-0.5 mt-2">
              <label className='text-sm font-bold'>Name</label>
              <input value={taskData.name} onChange={(event) => setTaskData({...taskData, name: event.target.value})} className="border border-solid focus:outline-none p-1 rounded" type="text"/>
              <br />
              <label className='text-sm font-bold'>Description</label>
              <textarea value={taskData.description ?? ''} onChange={(event) => setTaskData({...taskData, description: event.target.value})} className="border border-solid focus:outline-none p-1 rounded" />
              {currentTask.status != StatusType.DONE &&
                <>
                  <br />
                  <label className='text-sm font-bold'>Estimated finish date</label>
                  <input value={taskData.estimatedTime ? formatDate(taskData.estimatedTime, "yyyy-MM-dd") : ''} onChange={(event) => isDateValid(new Date(event.target.value) ? setTaskData({...taskData, estimatedTime: new Date(event.target.value)}) : null)} type="date" className="border border-solid focus:outline-none p-1 rounded" />
                </>
              }
            </div>
          </>
        }
        </div>
      }
    </>
  )
}