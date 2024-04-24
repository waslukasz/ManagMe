import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Projects from './components/projects/Projects'

import './index.css'
import ProjectsCreate from './components/projects/CreateProject'
import Functionalities from './components/functionalities/Functionalities'
import CreateFunctionality from './components/functionalities/CreateFunctionality'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
