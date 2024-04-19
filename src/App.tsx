import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Projects from './components/projects/Projects'

import './index.css'
import ProjectsCreate from './components/projects/Create'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/projects' element={<Projects/>} />
          <Route path='/projects/create' element={<ProjectsCreate/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
