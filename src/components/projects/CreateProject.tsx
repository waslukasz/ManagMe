
import { useRef } from 'react'
import ProjectApi from '../../api/ProjectApi';
import { Link, useNavigate } from 'react-router-dom';
import { ProjectDto } from '../../types/ProjectType';

export default function ProjectsCreate() {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const projectApi = new ProjectApi();
  
  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault()
    const newProject: ProjectDto = {
      name: nameRef.current!.value,
      description: descRef.current!.value
    }
    projectApi.Add(newProject);
    navigate("/projects");
  }

  return (
      <>
        <div className='flex flex-col'>
          <div className='flex bg-red-400'>
            <Link to={"/projects"} className='p-2 hover:bg-red-700 transition-colors'>Go back to all projects</Link>
          </div>
          <div className="flex justify-center mt-7 font-sans">
            <form className="inline-flex flex-col gap-1">
              <label className='font-bold'>Project name</label>
              <input ref={nameRef} className="rounded border border-solid p-2 border-black" type="text" name="name"/>
              <label className='font-bold mt-3'>Description</label>
              <textarea ref={descRef} className="rounded border border-solid p-2 border-black" name="desc" id="" cols={30} rows={5}></textarea>
              <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 mt-3 rounded font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }