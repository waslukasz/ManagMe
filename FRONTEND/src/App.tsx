import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Projects from './components/projects/Projects'

import './index.css'
import ProjectsCreate from './components/projects/CreateProject'
import Functionalities from './components/functionalities/Functionalities'
import CreateFunctionality from './components/functionalities/CreateFunctionality'
import Tasks from './components/tasks/Tasks'
import CreateTask from './components/tasks/CreateTask'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/projects' element={<Projects/>} />
          <Route path='/projects/create' element={<ProjectsCreate/>} />
          <Route path='/functionalities' element={<Functionalities/>} />
          <Route path='/functionalities/create' element={<CreateFunctionality/>} />
          <Route path={'/tasks/:functionalityId'} element={<Tasks />} />
          <Route path={'/tasks/create/:functionalityId'} element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
