import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import ViewBlog from './components/ViewBlog'
import AddBlog from './components/AddBlog'
import Learnmore from './components/Learnmore'
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
         <Route path='/:id' element={<Learnmore/>}></Route>
       </Routes>
      
    </div>
  )
}

export default App


