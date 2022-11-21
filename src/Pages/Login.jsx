import React,{useState} from 'react';
import "../Styles/Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Config } from "../Config/Config";
import axios from 'axios';



const formValidationSchema = yup.object({
    userName: yup.string().required("Enter user name"),
    password: yup.string().required("Enter password"),
   
    
  });

function Login() {

    const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        userName:"",
        password:"",
       
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        //    alert(JSON.stringify(values))
        //    const result = await axios.post(`${Config.api}/` , values)
      },
})
      
      
  return (
   <>
   <div className='login-head'>
    <div className='login'>
  <h2>Login</h2>
  <form className='login-form' onSubmit={handleSubmit}>
    <div className='fieldBox'>
    <label>Username</label>
  <input
            type="text"
            name="userName"
            placeholder="Enter user name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
          />
           <small>
            {errors.userName && touched.userName ? errors.userName : null}
          </small>
    </div>
    <div className='fieldBox'>
    <label>Password</label>
  <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
           <small>
            {errors.password && touched.password ? errors.password : null}
          </small>
    </div>
    
 <button type="submit">submit</button>
  </form>
  <div className='para-login'>
    <p>I'dont have and account ?</p>
    <p>Sign up</p>
  </div>
    </div>

   </div>
   </>
  )
}

export default Login