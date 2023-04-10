import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Workflow from './components/Workflow'
import Input from './components/Input'

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<Input />} />
      <Route path='/workflow' element={<Workflow />} />
    </Routes>
  )
}

export default App