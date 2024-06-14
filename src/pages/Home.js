import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

import axios from "axios"
import { Link,} from "react-router-dom";

export default function Home() {

  useEffect(()=>{
    setTimeout(()=>{
      getAllUsers();
    },500)
  },[])
  
  // URL
  const URL="http://localhost:8000";

  // Users state
  const [allUsers, setAllUsers] = useState([])

  // Records
  const [records, setRecords] = useState([])

  // loader State
  const [loader, setLoader] = useState(false)


  // Filtered users based on search term
  const Filter=(e)=>{
    setRecords(allUsers.filter(item=>item.fName.toLowerCase().includes(e.target.value)))
  }


  // getAllUsers
  const getAllUsers=async()=>{
    try {
      const res= await axios.get(`${URL}/getAllUsers`)
      console.log("getAllUsers => ",res.data.data)

      setAllUsers(res.data.data)
      setRecords(res.data.data)
      setLoader(true)

    } catch (error) {
      console.log("Error => ",error)
    }
  }

  // deleteUserHandler
  const deleteUserHandler=async(uid)=>{
    const id=uid
    console.log("id => ",id)
    try {
      const res = await axios.delete(`${URL}/deleteUser/${id}`)
      console.log("deleteUser => ",res)

      let newAllUsers=allUsers.filter((items,index)=>{
        return items._id!==id
      })

      setRecords(newAllUsers)
      setAllUsers(newAllUsers)
    } catch (error) {
      console.log("Error => ",error)
    }
  }
  return (
    <>
      <Container fluid className="mt-5">
        <Row className=" table-responsive " >
          <Col className="g-0">

            {/* if loader */}

            {
              loader ? <>
              
          {/* if Data is Empty */}

          {
            !allUsers.length ? <>
            <div class="alert alert-danger text-center" role="alert">Data is Empty! go to AddUser Page and Add User </div>
            </> : <> 
            <h1 className=" text-center">All Users</h1>
            <div className="col-3 ms-auto mb-3 me-3">
        
        <input class="form-control me-2" type="search" placeholder="Search by First Name" aria-label="Search User by First Name"  onChange={Filter} />
        
      
            </div>
            <Table className="table table-dark table-hover table-bordered">
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone #</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Gender</th>
                  <th colSpan={3}>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center ">
                {
                  records.map((items,index)=>{
                    return <tr>
                      <td>{index+1}</td>
                      <td className="text-capitalize">{items._id}</td>
                      <td className="text-capitalize">{items.fName}</td>
                      <td className="text-capitalize">{items.lName}</td>
                      <td>{items.email}</td>
                      <td className="text-capitalize">{items.phone}</td>
                      <td className="text-capitalize">{items.country}</td>
                      <td className="text-capitalize">{items.city}</td>
                      <td className="text-capitalize">{items.state}</td>
                      <td className="text-capitalize">{items.gender}</td>
                      <td ><Link className="btn btn-outline-success w-100" to={`/viewUser/${items._id}`}>View</Link></td>
                      <td><Link className="btn btn-outline-warning w-100" to={`/editUser/${items._id}`} >Edit</Link></td>
                      <td><button className="btn btn-outline-danger w-100" onClick={()=>{deleteUserHandler(items._id)}}>Delete</button></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            </>
          }
              </> :  <>
              <div class="d-flex justify-content-center overflow-hidden">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
              </>
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}
