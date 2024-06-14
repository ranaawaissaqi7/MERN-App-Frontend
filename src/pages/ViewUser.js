import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ViewUser() {

  useEffect(() => {
    getUserHandler();
  }, [])
  // URL
  const URL = "http://localhost:8000";

  // getUser Id
  const { id } = useParams()
  console.log("id => ", id)

  const [userData, setUserData] = useState({})

  const getUserHandler = async () => {
    try {
      const res = await axios.get(`${URL}/getUser/${id}`)
      console.log("res => ", res.data)
      setUserData(res.data.data)
    } catch (error) {
      console.log("error => ", error)
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center main-row">
          <div className="col-xl-6 col-lg-8 col-md-10 col-12 g-0">

            <table class="table table-dark table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col" colSpan={2} className='text-center'>Single User Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{userData._id}</td>
                </tr>
                <tr>
                  <th scope="row">First Name</th>
                  <td>{userData.fName}</td>
                </tr>
                <tr>
                  <th scope="row">Last Name</th>
                  <td>{userData.lName}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>{userData.phone}</td>
                </tr>
                <tr>
                  <th scope="row">Country</th>
                  <td>{userData.country}</td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{userData.city}</td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{userData.state}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td>{userData.gender}</td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}
