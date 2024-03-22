import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
      <>
        <div className='flex h-12 p-3 bg-zinc-800 text-white items-center justify-between'>
          <div className='text-blue-400 font-bold hover:underline'>
            <Link to="/projects">Projects</Link>
          </div>
          <div>Logged as: <span className='font-semibold'>*placeholder*</span></div>
        </div>
      </>
    )
  }