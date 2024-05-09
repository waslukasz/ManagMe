import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleShowLogin = (event:React.MouseEvent) => {
      event.preventDefault();
      setShowLogin((prevState) => !prevState)
  }

    return (
      <>
        <div className='flex h-12 p-3 bg-zinc-800 text-white items-center justify-between'>
          <div className='inline-flex gap-3 font-mono'>
            <Link className='text-red-500 font-bold hover:underline' to="/projects">Projects</Link>
          </div>
            {isLoggedIn && <div>Logged as: <span className='font-semibold'>*placeholder*</span></div>}
            {!isLoggedIn && 
            <div className="relative">
                <div onClick={handleShowLogin} className={`select-none ${!showLogin && "text-blue-500 hover:text-white hover:bg-blue-500"} border-blue-500 font-mono rounded-md border-solid border p-2  cursor-pointer transition-colors duration-100 ${showLogin && "text-white bg-blue-500 hover:text-black"}`}>Login
                </div>
                { showLogin && 
                    <div className="text-black bg-white shadow absolute top-12 right-0 p-5 w-64 rounded font-sans">
                        <label htmlFor="username" className='font-bold text-sm'>Username</label>
                        <input type="text" name="username" id="username" placeholder='Username' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow focus:shadow-gray-400 mt-1 mb-3' />
                        <label htmlFor="password" className='font-bold text-sm'>Password</label>
                        <input type="password" name="password" id="password" placeholder='********' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow focus:shadow-gray-400 mt-1 mb-3' />
                        <div className='flex justify-between items-center'>
                          <button className='shadow px-4 py-2.5 rounded bg-blue-400 font-bold text-white hover:bg-blue-500'>Sign in</button>
                        </div>
                    </div>
                }
            </div>
            }
        </div>
      </>
    )
}