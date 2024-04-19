import { Link } from 'react-router-dom'
import { useEffect, useState} from 'react'
import Project from './Project'
import { Project as ProjectType } from '../../types/ProjectType';
import { GetAllProjects } from '../../requests/ProjectRequest';

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAllProjects() {
      setIsFetching(true);
      try {
          let projects = await GetAllProjects();
          setProjects(projects);
      } catch (error) {}
      setIsFetching(false);
    }
      fetchAllProjects();
    }, [])

  return (
      <>
        <div className='flex flex-col'>
          <div className='flex bg-red-400'>
            <Link to={"/projects/create"} className='p-2 hover:bg-red-700 transition-colors'>Create new project</Link>
          </div>
          {isFetching && <p className='text-center text-2xl tracking-wider'>Loading content...</p>}
          
          { !isFetching &&
            <div className='grid grid-cols-5 auto-rows-fr gap-3 m-3'>
              {projects.map((project) => <Project key={project.id} data={project} />)}
            </div>
          }
        </div>
      </>
    )
  }