import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';

export default function EditUser() {
  // userDataState
  const [userDataState, setUserDataState] = useState({});

  // URL
  const URL = "http://localhost:8000";

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // getUser
    const getUser = async () => {
      try {
        const res = await axios.get(`${URL}/getUser/${id}`);
        setUserDataState(res.data.data);
      } catch (error) {
        console.log("Error => ", error);
      }
    };
    getUser();
  }, []);

  // useEffect to set form values once userDataState is fetched
  useEffect(() => {
    if (userDataState) {
      formik.setValues({
        fName: userDataState.fName || "",
        lName: userDataState.lName || "",
        email: userDataState.email || "",
        phone: userDataState.phone || "",
        country: userDataState.country || "",
        city: userDataState.city || "",
        state: userDataState.state || "",
        gender: userDataState.gender || "",
      });
    }
  }, [userDataState]);

  const { isAuth } = useContext(AuthContext);

  const [alertErrorState, setAlertErrorState] = useState("");
  const [showAlert, setShowAlert] = useState("d-none");

  // closeAlert
  const closeAlert = () => {
    setShowAlert("d-none");
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
    "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
  ];

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      state: "",
      gender: ""
    },
    validationSchema: Yup.object({
      fName: Yup.string().trim().min(3, "Please Enter Valid Name").max(50, "Please Enter Valid Name").required("First Name is Required"),
      lName: Yup.string().trim().min(3, "Please Enter Valid Name").max(50, "Please Enter Valid Name").required("Last Name is Required"),
      email: Yup.string().trim().email("Invalid email format").required("Email is Required"),
      phone: Yup.string().trim().min(11, "Please Enter 11 digit of phone#").max(11, "Please Enter 11 digit of phone#").required("Phone No is Required"),
      country: Yup.string().trim().required("Country is Required"),
      city: Yup.string().trim().min(3, "Please Enter Full Name of City").max(50, "Please Enter Valid City Name").required("City is Required"),
      state: Yup.string().trim().min(3, "Please Enter Full Name of State").max(50, "Please Enter Valid State Name").required("State is Required"),
      gender: Yup.string().trim().required("Gender is Required"),
    }),
    onSubmit: (values) => {
      console.log("Form values => ", values);
      const lowercaseValues = Object.keys(values).reduce((acc, key) => {
        acc[key] = typeof values[key] === 'string' ? values[key].toLowerCase() : values[key];
        return acc;
      }, {});
      console.log("Formik values => ", lowercaseValues);
      if (!isAuth) {
        setAlertErrorState("Please Login and then Submit!");
        setShowAlert("d-block");
      } else {
        addUser(lowercaseValues);
      }
    },
  });

  // addUser
  const addUser = async (values) => {
    try {
      const res = await axios.patch(`${URL}/updateUser/${id}`, values);
      console.log("User updated successfully => ", res);
      navigate("/home");
    } catch (error) {
      console.log("Error => ", error);
      setAlertErrorState(error.response.data.message);
      setShowAlert("d-block");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center main-row">
          <div className="col-xl-6 col-lg-8 col-12">
            <h1 className='text-center'>Edit User</h1>
            <Alert error={alertErrorState} showAlert={showAlert} closeAlert={closeAlert} />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="fName" name='fName' placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fName} />
                <label htmlFor="fName">First Name</label>
                {formik.touched.fName && formik.errors.fName ? (<div className='text-danger'>{formik.errors.fName}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="lName" name="lName" placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lName} />
                <label htmlFor="lName">Last Name</label>
                {formik.touched.lName && formik.errors.lName ? (<div className='text-danger'>{formik.errors.lName}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" name='email' placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                <label htmlFor="email">Email</label>
                {formik.touched.email && formik.errors.email ? (<div className='text-danger'>{formik.errors.email}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="phone" name='phone' placeholder="Ex:03000000000" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                <label htmlFor="phone">Phone# <span className='ms-3'>Ex:03000000000</span></label>
                {formik.touched.phone && formik.errors.phone ? (<div className='text-danger'>{formik.errors.phone}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <select className="form-select" id="country" name="country" aria-label="Floating label select example" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.country}>
                  {
                    countries.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))
                  }
                </select>
                <label htmlFor="country">Select Country</label>
                {formik.touched.country && formik.errors.country ? (<div className='text-danger'>{formik.errors.country}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="city" name='city' placeholder="City" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                <label htmlFor="city">City</label>
                {formik.touched.city && formik.errors.city ? (<div className='text-danger'>{formik.errors.city}</div>) : null}
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="state" name='state' placeholder="State" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.state} />
                <label htmlFor="state">State</label>
                {formik.touched.state && formik.errors.state ? (<div className='text-danger'>{formik.errors.state}</div>) : null}
              </div>
              <div className="form-check form-check-inline">
                <p>Gender:</p>
                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.gender === "male"} />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.gender === "female"} />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (<div className='text-danger'>{formik.errors.gender}</div>) : null}
              <button className='btn btn-outline-dark w-100 mt-3 py-3' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
