import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
      <>
        <div className='flex h-12 p-3 bg-zinc-800 text-white items-center justify-between'>
          <div className='inline-flex gap-3 font-mono'>
            <Link className='text-red-500 font-bold hover:underline' to="/projects">Projects</Link>
          </div>
          <div>Logged as: <span className='font-semibold'>*placeholder*</span></div>
        </div>
      </>
    )
  }