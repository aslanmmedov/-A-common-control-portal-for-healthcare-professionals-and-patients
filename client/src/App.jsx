
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ClientLayout from './ClientLayout'
import AdminLayout from './AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import Home from './Pages/Client/Home'
import LoginAdmin from './Pages/Admin/AccesPortal/Admin/login'
import AuthPatient from './Pages/Client/AccesPortal/Patient/auth'
import LoginPatient from './Pages/Client/AccesPortal/Patient/login'
import RegisterPatient from './Pages/Client/AccesPortal/Patient/register'
import LoginDoctor from './Pages/Client/AccesPortal/Doctor/login'
import RegisterDoctor from './Pages/Client/AccesPortal/Doctor/register'
import AuthDoctor from './Pages/Client/AccesPortal/Doctor/auth'
import KabinetPAtient from './Pages/Client/Kabinet/Patient'
import KabinetDoctor from './Pages/Client/Kabinet/Doctor'
import KabinetPatient from './Pages/Client/Kabinet/Patient'
import NewsDetail from './Pages/Client/Kabinet/Doctor/newsDetail/newsDetail'

function App() {
  return (
    <>
      <Routes>
        <Route path = "/patient">
            <Route index element = {<LoginPatient/>}/>
            <Route path = "auth" element = {<AuthPatient/>}/>
            <Route path = ":id" element = {<RegisterPatient/>}/>
        </Route>
        <Route path = "/doctor">
            <Route index element = {<LoginDoctor/>}/>
            <Route path = "auth" element = {<AuthDoctor/>}/>
            <Route path = ":id" element = {<RegisterDoctor/>}/>
        </Route>
        <Route path = "/" element = {<ClientLayout/>}>
          <Route index element = {<Home/>}/>
          <Route path = ":id" element = {<NewsDetail/>}/>
          <Route path = "patient_kabinet" element = {<KabinetPatient/>}/>
          <Route path = "doctor_kabinet" element = {<KabinetDoctor/>}/>
        </Route>
        <Route path = "/admin" element = {<AdminLayout/>}>
          <Route index element = {<LoginAdmin/>}/>
          <Route path = "dashboard" element = {<AdminDashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
