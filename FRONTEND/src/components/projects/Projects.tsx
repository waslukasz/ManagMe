import { Link } from 'react-router-dom'
import { useEffect, useState} from 'react'
import Project from './Project'
import { Project as ProjectType } from '../../types/ProjectType';
import ProjectApi from '../../api/ProjectApi';

export default function Projects() {
  const projectApi = new ProjectApi();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  async function fetchAllProjects() {
    setIsFetching(true);
    try {
        let projects = await projectApi.GetAll();
        setProjects(projects);
    } catch (error) {}
    setIsFetching(false);
  }

  useEffect(() => {
      fetchAllProjects();
  }, [])

  useEffect(() => {
    fetchAllProjects();
    if(!isUpdated) setIsUpdated(true);
  }, [isUpdated])

  function updateHandler() {
    if (isUpdated) setIsUpdated(false);
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex bg-red-400'>
          <Link to={"/projects/create"} className='p-2 hover:bg-red-700 transition-colors'>Create new project</Link>
          {isUpdated && projects.length > 0 && <Link to={"/functionalities"} className='p-2 hover:bg-red-700 transition-colors'>Active project functionalities</Link>}
        </div>
        {isFetching && <p className='text-center text-2xl tracking-wider'>Loading content...</p>}
        { !isFetching &&
          <div className='grid grid-cols-5 auto-rows-fr gap-3 m-3'>
            {projects.map((project) => <Project key={project.id} data={project} updateState={isUpdated} updateHandler={updateHandler} />)}
          </div>
        }
      </div>
    </>
  )
}