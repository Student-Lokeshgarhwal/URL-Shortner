import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/Login'
import Home from './components/Home'
import Admin from './components/Admin'
import Unauth from './components/Unauth'
import Redirectsite from './components/redirectsite'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/signup' element = {<Signup />}/>
      <Route path = '/login' element = {<Login />} />
      <Route path = '/' element = {<Home />} />
      <Route path = '/admin/url' element = {<Admin />} />
      <Route path = '/unauthorized' element = {<Unauth />} />
      <Route path = '/url/:shortId' element = {<Redirectsite />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App