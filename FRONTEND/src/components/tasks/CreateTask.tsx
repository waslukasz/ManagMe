import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TaskApi from '../../api/TaskApi';
import { format as formatDate, addDays, isValid as isDateValid } from 'date-fns'
import { TaskDto } from '../../types/TaskType';

export default function ProjectsCreate() {
  const { functionalityId } = useParams();
  
  const taskApi = new TaskApi();
  const [taskData, setTaskData] = useState({ name: '', description: '', estDate: addDays(new Date(), 7)});
  const [createFailed, setCreateFailed] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault();

    if (taskData.name == '') {
      setCreateFailed(true);
      return;
    }

    const newTask: TaskDto = {
        name: taskData.name,
        description: taskData.description,
        functionalityId: functionalityId!,
        estimatedTime: taskData.estDate,
    }

    taskApi.Add(newTask);
    navigate("/tasks/" + functionalityId);
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex bg-red-400'>
          <Link to={"/projects"} className='p-2 hover:bg-red-700 transition-colors'>Go back to projects</Link>
          <Link to={"/functionalities"} className='p-2 hover:bg-red-700 transition-colors'>Go back to functionalities</Link>
          <Link to={"/tasks/" + functionalityId} className='p-2 hover:bg-red-700 transition-colors'>Go back to tasks</Link>
        </div>

        <div className="flex justify-center mt-7 font-sans">
          <form className="inline-flex flex-col gap-1">
            <label className='font-bold'>Task name</label>
            <input required value={taskData.name} onChange={(event) => setTaskData({...taskData, name: event.target.value})} className="rounded border border-solid p-2 border-black" type="text" name="name"/>
            {createFailed &&
              <span className='text-sm text-red-500 italic'>This field cannot be empty.</span>
            }

            <label className='font-bold mt-2'>Description</label>
            <textarea required value={taskData.description} onChange={(event) => setTaskData({...taskData, description: event.target.value})} className="rounded border border-solid p-2 border-black" name="desc" id="" cols={30} rows={5}></textarea>

            <label className='font-bold mt-2'>Estimated finish date</label>
            <input value={formatDate(taskData.estDate, "yyyy-MM-dd")} onChange={(event) => isDateValid(new Date(event.target.value)) ? setTaskData({...taskData, estDate: new Date(event.target.value)}) : null } type="date" name="estDate" className="rounded border border-solid p-2 border-black"/>

            <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 mt-2 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}