
import { useRef } from 'react'
import { AddProject } from '../../requests/ProjectRequest';
import { Link, useNavigate } from 'react-router-dom';

export default function ProjectsCreate() {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault()
    AddProject(nameRef.current!.value, descRef.current!.value);
    navigate("/projects");
  }

  return (
      <>
        <div className='flex flex-col'>
          <div className='flex bg-red-400'>
            <Link to={"/projects"} className='p-2 hover:bg-red-700 transition-colors'>Go back to all projects</Link>
          </div>
          <div className="flex justify-center mt-7">
            <form className="inline-flex flex-col gap-2">
              <label htmlFor="name">
                Project name:
              </label>
              <input ref={nameRef} className="border border-solid p-1 border-black" type="text" name="name"/>
              <label htmlFor="desc">Description</label>
              <textarea ref={descRef} className="border border-solid border-black" name="desc" id="" cols={30} rows={5}></textarea>
              <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }