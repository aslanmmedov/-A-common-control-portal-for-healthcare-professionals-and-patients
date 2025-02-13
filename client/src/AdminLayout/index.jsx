import React from 'react'
import AdminHeader from '../Layout/AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../Layout/AdminFooter'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminLayout