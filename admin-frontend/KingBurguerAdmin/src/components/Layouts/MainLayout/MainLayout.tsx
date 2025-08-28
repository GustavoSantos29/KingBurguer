import React from 'react'
import './style.css'
import Navbar from '../../Navbar'
import { LogoHome } from '../../../assets/Logo/LogoHome'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='main'>
      <Navbar />
      <LogoHome />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}
