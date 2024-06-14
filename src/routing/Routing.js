import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from '../pages/Home'
import Header from '../components/Header'
import AddUser from '../pages/AddUser'
import ViewUser from '../pages/ViewUser'
import EditUser from '../pages/EditUser'
import SignUp from '../auth/SignUp'
import Login from '../auth/Login'
import { AuthContext } from '../context/AuthContext'
import PrivateRoute from '../important/PrivateRoute'
export default function Routing() {

  const { isAuth, } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AddUser />} />
          <Route path='/home' element={<PrivateRoute Component={Home} />} />
          <Route path='/viewUser/:id' element={<ViewUser />} />
          <Route path='/editUser/:id' element={<EditUser />} />
          <Route path='/signUp' element={<SignUp />} />
          {/* <Route path='/login' element={<Login/>} /> */}
          <Route path='/login' element={!isAuth ? <Login /> : <Navigate to="/allUser" element={<Home />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
