import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App