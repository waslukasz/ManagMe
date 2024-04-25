import { Link, useParams } from 'react-router-dom'
import { useEffect, useState} from 'react'
import TaskApi from '../../api/TaskApi';
import { StatusType, Task as TaskType } from '../../types/TaskType';
import Task from './Task';

export default function Tasks() {
  const { functionalityId } = useParams();
  const taskApi = new TaskApi();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  async function fetchAllTasks() {
    setIsFetching(true);
    try {
        let tasks = await taskApi.GetAll();
        setTasks(tasks);
    } catch (error) {}
    setIsFetching(false);
  }

  useEffect(() => {
      fetchAllTasks();
  }, [])

  useEffect(() => {
    fetchAllTasks();
    if(!isUpdated) setIsUpdated(true);
  }, [isUpdated])

  function updateHandler() {
    if (isUpdated) setIsUpdated(false);
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex bg-red-400'>
          <Link to={"/projects"} className='p-2 hover:bg-red-700 transition-colors'>Go back to projects</Link>
          <Link to={"/functionalities"} className='p-2 hover:bg-red-700 transition-colors'>Go back to functionalities</Link>
          <Link to={"/tasks/create/" + functionalityId} className='p-2 hover:bg-red-700 transition-colors'>Add new task</Link>
        </div>
        <span className='text-4xl mt-5 ml-3'>Tasks</span>
        {isFetching && <p className='text-center text-2xl tracking-wider'>Loading content...</p>}
        { !isFetching && isUpdated &&
          <div className='grid grid-cols-3 gap-3 m-3'>
            <div className='grid grid-cols-1 auto-rows-min gap-3'>
              <div className='text-2xl text-center'>TODO</div>
              {tasks.map((task) => task.functionalityId == functionalityId && task.status == StatusType.TODO && <Task key={task.id} data={task} updateState={isUpdated} updateHandler={updateHandler} />) || <p>No tasks to display...</p>}
            </div>

            <div className='grid grid-cols-1 auto-rows-min gap-3'>
              <div className='text-2xl text-center'>Doing</div>
              {tasks.map((task) => task.functionalityId == functionalityId && task.status == StatusType.DOING && <Task key={task.id} data={task} updateState={isUpdated} updateHandler={updateHandler} />) || <p>No tasks to display...</p>}
            </div>

            <div className='grid grid-cols-1 auto-rows-min gap-3'>
              <div className='text-2xl text-center'>Done</div>
              {tasks.map((task) => task.functionalityId == functionalityId && task.status == StatusType.DONE && <Task key={task.id} data={task} updateState={isUpdated} updateHandler={updateHandler} />) || <p>No tasks to display...</p>}
            </div>
          </div>
        }
      </div>
    </>
  )
}