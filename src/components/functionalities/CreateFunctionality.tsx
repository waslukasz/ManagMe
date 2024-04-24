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
          <div className="flex justify-center mt-7">
            <form className="inline-flex flex-col gap-2">
                <label htmlFor="name">
                    Functionality name:
                </label>
                <input ref={nameRef} className="rounded-sm border border-solid p-1 border-black" type="text" name="name"/>
                <label htmlFor="desc">Description</label>
                <textarea ref={descRef} className="rounded-sm border border-solid border-black" name="desc" id="" cols={30} rows={5}></textarea>
                <label htmlFor="priority">Priority</label>
                <select ref={priorityRef} defaultValue={0} name='priority' className="rounded-sm border border-solid border-black">
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                </select>
                <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }