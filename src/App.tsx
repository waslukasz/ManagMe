import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Projects from './components/projects/Projects'

import './index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/projects' element={<Projects/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
