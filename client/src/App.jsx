
import { Route, Routes } from 'react-router-dom'
import './App.css'

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
