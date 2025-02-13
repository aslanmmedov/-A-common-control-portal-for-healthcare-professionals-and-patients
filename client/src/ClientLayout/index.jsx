import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from '../Layout/ClientHeader'
import ClientFooter from '../Layout/ClientFooter'

const ClientLayout = () => {
  return (
    <>
      <ClientHeader/>
      <Outlet/>
      <ClientFooter/>
    </>
  )
}

export default ClientLayout