
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
          <div className="flex justify-center mt-7">
            <form className="inline-flex flex-col gap-2">
              <label htmlFor="name">
                Project name:
              </label>
              <input ref={nameRef} className="rounded-sm border border-solid p-1 border-black" type="text" name="name"/>
              <label htmlFor="desc">Description</label>
              <textarea ref={descRef} className="rounded-sm border border-solid border-black" name="desc" id="" cols={30} rows={5}></textarea>
              <button onClick={handleSubmit} className="text-green-600 border-solid border border-green-600 p-2 rounded-md font-mono font-bold hover:bg-green-600 hover:text-white transition-colors">Create</button>
            </form>
        </div>
        </div>
      </>
    )
  }