import { useRef, useState } from 'react'
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
    let newName:string = nameRef.current!.value;
    let newDesc:string = descRef.current!.value;

    const newTask: TaskDto = {
        name: newName,
        description: newDesc,
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
          <div className="flex justify-center mt-7 font-sans">
            <form className="inline-flex flex-col gap-1">
                <label className='font-bold'>
                    Task name
                </label>
                <input ref={nameRef} className="rounded border border-solid p-2 border-black" type="text" name="name"/>
                <label className='font-bold mt-2'>Description</label>
                <textarea ref={descRef} className="rounded border border-solid p-2 border-black" name="desc" id="" cols={30} rows={5}></textarea>
                <label className='font-bold mt-2'>Estimated finish date</label>
                <input ref={estDateRef} type="date" name="estDate" className="rounded border border-solid p-2 border-black"/>
                <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 mt-2 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }