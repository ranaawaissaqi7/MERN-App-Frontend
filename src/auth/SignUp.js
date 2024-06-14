import React, { useState } from 'react'
import axios from "axios"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom"
import Alert from '../components/Alert';
export default function SignUp() {

  const [alertErrorState, setAlertErrorState] = useState("")

  const [showAlert, setShowAlert] = useState("d-none");

  // closeAlert
  const closeAlert = () => {
    setShowAlert("d-none")
  }
  // URL
  const URL = "http://localhost:8000"

  const navigate = useNavigate("")

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email("Invalid email format").required("Email is Requird"),
      password: Yup.string().trim().min(7, "Password should be at least 7 characters").required("Password is Requird"),
      cpassword: Yup.string().trim().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm Password is Requird"),

    }),
    onSubmit: (values) => {
      // Convert all string values to lowercase
      const lowercaseValues = Object.keys(values).reduce((acc, key) => {
        acc[key] = typeof values[key] === 'string' ? values[key].toLowerCase() : values[key];
        return acc;
      }, {});
      console.log("formik values => ", lowercaseValues);
      // Call your submit function with lowercaseValues
      addUser(lowercaseValues);
    },
  })

  // addUser
  const addUser = async (values) => {
    try {
      const res = await axios.post(`${URL}/userSignUp`, values)
      console.log("addUser DB Successfully Done => ", res)

      navigate("/login")
    } catch (error) {
      console.log("Error => ", error)
      setAlertErrorState(error.response.data.message)
      setShowAlert("d-block")

    }
  }

  return (
    <>

      <div className="container">

        <div className="row justify-content-center main-row ">
          <div className="col-xl-6 col-lg-8  col-12">

            <Alert error={alertErrorState} showAlert={showAlert} closeAlert={closeAlert} />

            <form onSubmit={formik.handleSubmit}>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" name='email' placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                <label for="email">Email</label>
                {formik.touched.email && formik.errors.email ? (<div className='text-danger'>{formik.errors.email}</div>) : null}
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" name='password' placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                <label for="password">Password</label>
                {formik.touched.password && formik.errors.password ? (<div className='text-danger'>{formik.errors.password}</div>) : null}
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cpassword} />
                <label for="cpassword">Confirm Password</label>
                {formik.touched.cpassword && formik.errors.cpassword ? (<div className='text-danger'>{formik.errors.cpassword}</div>) : null}
              </div>

              <button className='btn btn-outline-dark w-100 mt-3 py-3' type='submit'>SignUp</button>

              <p className="  text-center my-4 ">Have an account already? <Link to={"/login"} className=" text-danger">Login in here!</Link></p>
            </form>



          </div>
        </div>


      </div>

    </>
  )
}
