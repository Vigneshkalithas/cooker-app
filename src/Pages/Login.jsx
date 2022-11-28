import React, { useState, useContext, useEffect } from "react";
import "../Styles/Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config/Config";
import axios from "axios";
import { toast } from "react-toastify";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
  username: yup.string().required("Name is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser, isAuthenticated, setIsAuthenticated } =
    useContext(MyContext);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
      navigate("/");
    }
  }, []);

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        try {
          const result = await axios.post(`${Config.api}/user/login`, values);
          const resData = await result.data;
          // console.log(resData);
          setUser(resData.sessionData);
          setIsAuthenticated(true);
          const Token = result.data.sessionData.token;
          localStorage.setItem("react-app-token", Token);
          const user = JSON.stringify(result.data.sessionData);
          localStorage.setItem("user", user);
          navigate("/home");

          if (result.data.error) {
            toast.error("Error: " + result.data.error);
          } else {
            toast.success(result.data.message);
            // navigate("/")
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <>
      <div className="login-head">
        <div className="login">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="fieldBox">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter user name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <small>
                {errors.username && touched.username ? errors.username : null}
              </small>
            </div>
            <div className="fieldBox">
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
          <div className="para-login" onClick={() => navigate("/signup")}>
            <p>I'dont have and account |</p>
            <p>Sign up</p>
          </div>
          <div className="fp" onClick={() => navigate("/forgetpassword")}>
            <p>Forget Password</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
