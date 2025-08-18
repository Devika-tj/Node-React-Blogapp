import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import ViewBlog from './components/ViewBlog'
import AddBlog from './components/AddBlog'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
       <Routes>
        <Route path='/' element={<ViewBlog/>}></Route>
        <Route path='add' element={<AddBlog/>}></Route>
        <Route path='login' element={<Login/>}></Route>
       </Routes>
      
    </div>
  )
}

export default App


