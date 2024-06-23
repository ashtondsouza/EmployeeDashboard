import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav'
import Employee from './Components/Employee'
import { Route, Routes } from 'react-router-dom'
import EmployeeDetail from './Components/EmployeeDetail'
import InDevelopment from './Components/InDevelopment'

function App() {


  return (
    <>
    <div className='flex justify-between gap-[10px] w-screen '>
    <Nav/>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/development" element={<InDevelopment />} />
      </Routes>
    </div>
    </>
  )
}

export default App
