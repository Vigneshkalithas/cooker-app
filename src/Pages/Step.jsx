import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config/Config";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
  recipeName: yup.string().required("Enter recipe name"),
  recipePoster: yup.string().url().required("Kindly upload poster"),
  cookingTime: yup.number().min(1).required("Enter cooking time"),
  steps: yup.array().of(yup.string().required("Cannot be empty")).required(),
  ingName: yup.string().required("Enter ingredient Name"),
  ingQty: yup.number().required("Enter ingredient Qty"),
  recipeType: yup.string().required("Please choose type"),
  about: yup.string().required("tell me about this"),
});

function Step() {
  const { user, userRole, isAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([""]);
  const [steps, setSteps] = useState([]);
  steps.length = inputFields.length;

  useEffect(() => {
    if (!isAuthenticated || userRole == "viewer") {
      navigate("/unauthorized");
    }
  }, [isAuthenticated]);
  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        recipeName: "",
        recipePoster: "",
        cookingTime: "",
        steps: steps,
        ingName: "",
        ingQty: "",
        recipeType: "",
        about: "",
      },

      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const res = await fetch(`${Config.api}/recipe`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        alert("Data was submited successfully");
        // console.log(res);
        navigate("/list");
      },
    });
  function addInputField(e) {
    e.preventDefault();
    setInputFields((inputFields) => [...inputFields, ""]);
  }

  function removeInputField(index, e) {
    e.preventDefault();
    const copyInputField = [...inputFields];
    copyInputField.splice(index, 1);
    setInputFields(copyInputField);
    const copySteps = [...steps];
    copySteps.splice(index, 1);
    setSteps(copySteps);
    values.steps.splice(index, 1);
  }

  return (
    <>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="fieldBox">
            <label>Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              placeholder="Enter Recipe Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recipeName}
            />
            <small>
              {errors.recipeName && touched.recipeName
                ? errors.recipeName
                : null}
            </small>
          </div>
          <div className="fieldBox">
            <label>Poster Link</label>
            <input
              type="url"
              name="recipePoster"
              placeholder="Enter Recipe Poster"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recipePoster}
            />
            <small>
              {errors.recipePoster && touched.recipePoster
                ? errors.recipePoster
                : null}
            </small>
          </div>
          <div className="fieldBox">
            <label>Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              placeholder="Enter Cooking Time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cookingTime}
            />
            <small>
              {errors.cookingTime && touched.cookingTime
                ? errors.cookingTime
                : null}
            </small>
          </div>

          <div className="fieldBox">
            <label>Steps for Cooking</label>

            <button className="add" onClick={addInputField} type="button">
              <i className="fa-solid fa-plus"></i>
            </button>

            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <input
                    name={`steps [${index}]`}
                    placeholder="Add Step"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.steps[index]}
                    required
                  />
                  <button
                    className="delete"
                    type="button"
                    onClick={(e) => removeInputField(index, e)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <small>
                    {errors.steps && touched.steps ? errors.steps : null}
                  </small>
                </div>
              );
            })}
          </div>

          <div className="fieldBox">
            <label>Ingredients</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="ingName"
                placeholder="Ingredient Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ingName}
              />

              <input
                type="number"
                name="ingQty"
                placeholder="Ingredient Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ingQty}
              />
            </div>
            <div>
              <small className="sm-err">
                {errors.ingName && touched.ingName ? errors.ingName : null}
              </small>
              <small className="sm-err">
                {errors.ingQty && touched.ingQty ? errors.ingQty : null}
              </small>
            </div>
          </div>
          <div className="fieldBox">
            <h3>Recipe Type</h3>
            <div>
              <label htmlFor="veg">Veg</label>
              <input
                className="inputField"
                type="radio"
                name="recipeType"
                // defaultChecked={values.gender.includes("male")}
                value="veg"
                onChange={handleChange}
                onBlur={handleBlur}
                id="veg"
              />{" "}
              <label htmlFor="nonVeg">Non Veg</label>
              <input
                className="inputField"
                type="radio"
                name="recipeType"
                onChange={handleChange}
                onBlur={handleBlur}
                value="nonveg"
                // defaultChecked={values.gender.includes("female")}
                id="nonveg"
              />{" "}
            </div>
            <small>
              {errors.recipeType && touched.recipeType
                ? errors.recipeType
                : null}
            </small>
          </div>
          <div className="fieldBox">
            <label>About</label>
            <textarea
              htmlFor="about"
              type="textarea"
              name="about"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.about}
              id="about"
            />
            <small>{errors.about && touched.about ? errors.about : null}</small>
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
}

export default Step;
