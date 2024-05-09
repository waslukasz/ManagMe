import { useRef } from 'react'
import ProjectApi from '../../api/ProjectApi';
import FunctionalityApi from '../../api/FunctionalityApi';
import { Link, useNavigate } from 'react-router-dom';
import { FunctionalityDto } from '../../types/FunctionalityType';

export default function ProjectsCreate() {
  const functionalityApi = new FunctionalityApi();
  const projectApi = new ProjectApi();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  
  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault()
    
    const newFunctionality: FunctionalityDto = {
        name: nameRef.current!.value,
        description: descRef.current!.value,
        priority: parseInt(priorityRef.current!.value),
        project: projectApi.GetActiveId()!,
        status: 0,
        owner: ''
    }
    functionalityApi.Add(newFunctionality);
    navigate("/functionalities");
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
                    Functionality name:
                </label>
                <input ref={nameRef} className="rounded border border-solid p-2 border-black" type="text" name="name"/>
                <label className='font-bold mt-2'>Description</label>
                <textarea ref={descRef} className="rounded border border-solid p-2 border-black" name="desc" id="" cols={30} rows={5}></textarea>
                <label className='font-bold mt-2'>Priority</label>
                <select ref={priorityRef} defaultValue={0} name='priority' className="rounded border border-solid p-2 border-black">
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                </select>
                <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors mt-2">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }