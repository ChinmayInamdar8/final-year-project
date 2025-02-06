import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { HomePage } from './features/home/HomePage'
import { StudentLogin } from './features/home/StudentLogin'
import { StudentSignup } from './features/home/StudentSignup'
import { AdminLogin } from './features/home/AdminLogin'
import { AdminSignup } from './features/home/AdminSignup'
import { AdminDashboard } from './features/dashboard/AdminDashBoard'
import { StudentDashboard } from './features/dashboard/StudentDashboard'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route  path='/stdlogin' element={<StudentLogin></StudentLogin>}></Route>
        <Route  path='/stdsignup' element={<StudentSignup></StudentSignup>}></Route>
        <Route  path='/adminlogin' element={<AdminLogin></AdminLogin>}></Route>
        <Route  path='/adminsignup' element={<AdminSignup></AdminSignup>}></Route>
        <Route  path='/admindashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route  path='/studentdashboard' element={<StudentDashboard></StudentDashboard>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App