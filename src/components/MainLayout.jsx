
import React from 'react'
import Navbar from '../pages/navbar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
