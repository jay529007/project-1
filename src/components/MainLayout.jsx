
import React from 'react'
import Navbar from '../pages/navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <Outlet/>
    </>
  )
}
