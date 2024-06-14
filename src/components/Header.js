import React, { useContext, useEffect, } from 'react'

import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {


  const { isAuth, setIsAuth } = useContext(AuthContext);

  // logOutHandler
  const logOutHandler = () => {

    setIsAuth(false)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-uppercase text-white" href="#">mern crud app</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/"}>AddUser</NavLink>
              </li>

              {
                !isAuth ? <>

                  <li className="nav-item">
                    <NavLink className="nav-link mt-3 mt-lg-0 " aria-current="page" to={"/login"}>Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link mt-3 mt-lg-0 " aria-current="page" to={"/signUp"}>SignUp</NavLink>
                  </li>

                </> : <>

                  <li className="nav-item">
                    <NavLink className="nav-link mt-3 mt-lg-0 " aria-current="page" to={"/home"}>All Users</NavLink>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link mt-3 mt-lg-0 " aria-current="page" onClick={logOutHandler} >LogOut</button>
                  </li>

                </>
              }

            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
