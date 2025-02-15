
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ClientLayout from './ClientLayout'
import AdminLayout from './AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import Home from './Pages/Client/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<ClientLayout/>}>
          <Route index element = {<Home/>}/>
        </Route>
        <Route path = "/admin" element = {<AdminLayout/>}>
          <Route index element = {<AdminDashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
