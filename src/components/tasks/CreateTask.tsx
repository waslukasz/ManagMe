import { HTMLInputTypeAttribute, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskDto } from '../../types/TaskType';
import TaskApi from '../../api/TaskApi';

export default function ProjectsCreate() {
  const { functionalityId } = useParams();
  const taskApi = new TaskApi();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const estDateRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault()
    const newTask: TaskDto = {
        name: nameRef.current!.value,
        description: descRef.current!.value,
        functionalityId: functionalityId!,
        estimatedTime: estDateRef.current!.valueAsDate!,
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
          </div>
          <div className="flex justify-center mt-7">
            <form className="inline-flex flex-col gap-2">
                <label htmlFor="name">
                    Task name:
                </label>
                <input ref={nameRef} className="rounded-sm border border-solid p-1 border-black" type="text" name="name"/>
                <label htmlFor="desc">Description</label>
                <textarea ref={descRef} className="rounded-sm border border-solid border-black" name="desc" id="" cols={30} rows={5}></textarea>
                <label htmlFor="estDate">Estimated finish date</label>
                <input ref={estDateRef} type="date" name="estDate"/>
                <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }