import React, { useState, useContext } from "react";
import "../Styles/Signup.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config/Config";
import axios from "axios";
import { toast } from "react-toastify";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
  username: yup.string().required("Name is Required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Choose anyone"),
});

function Signup() {
  const { setUser, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    touched,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
    },

    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${Config.api}/user/signup`, values);
        if (result.data.message == "user already exists") {
          toast.error(result.data.message);
        } else {
          setUser(result.data);
          setIsAuthenticated(true);
          // const Token = result.data.sessionData.token;
          // localStorage.setItem("react-app-token", Token);
          navigate("/login");
          toast.success(result.data.message);
          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="signup-head">
        <div className="signup">
          <h2>Signup</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
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

            <h5>Role</h5>
            <div className="radio-head">
              <div className="radio-btn-head">
                <label htmlFor="admin">Admin</label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="admin"
                />
              </div>

              <div className="radio-btn-head">
                <label htmlFor="user">User</label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="user"
                />
              </div>

              <div className="radio-btn-head">
                <label htmlFor="viewer">Viewer</label>
                <input
                  type="radio"
                  name="role"
                  value="viewer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="viewer"
                />
              </div>
            </div>

            <div></div>

            <small>{errors.role && touched.role ? errors.role : null}</small>

            <button type="submit">submit</button>
          </form>
          <div className="para-signup" onClick={() => navigate("/")}>
            <p>Already Have an account |</p>
            <p>Login</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

// <div className="fieldBox">
// <h3>Role</h3>
// <div className="recipeTypeField">
//   <label htmlFor="Admin">Admin</label>
//   <input
//     className="inputField"
//     type="radio"
//     name="role"
//     value="Admin"
//     onChange={handleChange}
//     onBlur={handleBlur}
//     id="Admin"
//   />{" "}
//   <label htmlFor="Normal">Normal</label>
//   <input
//     className="inputField"
//     type="radio"
//     name="role"
//     onChange={handleChange}
//     onBlur={handleBlur}
//     value="Normal"
//     id="Normal"
//   />{" "}
//   <label htmlFor="ReadOnly">ReadOnly</label>
//   <input
//     className="inputField"
//     type="radio"
//     name="role"
//     onChange={handleChange}
//     onBlur={handleBlur}
//     value="ReadOnly"
//     id="ReadOnly"
//   />
// </div>
// </div>
