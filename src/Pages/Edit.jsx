import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Config } from "../Config/Config";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
  recipeName: yup.string().required("Enter recipe name"),
  recipePoster: yup.string().url().required("Kindly upload poster"),
  cookingTime: yup.number().min(1).required("Enter cooking time"),
  step: yup.array().of(yup.string().required("Cannot be empty")).required(),
  ingName: yup.string().required("Enter ingredient Name"),
  ingQty: yup.number().required("Enter ingredient Qty"),
  recipeType: yup.string().required("Please choose type"),
  about: yup.string().required("tell me about this"),
});

function Edit() {
  const { userRole, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(MyContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  let { id } = useParams();
  const [inputFields, setInputFields] = useState([""]);
  const [step, setStep] = useState([]);
  step.length = inputFields.length;

  let fetchData = async () => {
    try {
      let result = await axios.get(`${Config.api}/recipe/${id}`);
      setDetails(result.data);
      formik.setValues(result.data);
      const numberOfInputFields = [];
      numberOfInputFields.length = result.data.step.length;
      numberOfInputFields.fill("");
      setInputFields(numberOfInputFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/unauthorized");
    } else {
      fetchData();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      recipeName: "",
      recipePoster: "",
      cookingTime: "",
      step: [],
      ingName: "",
      ingQty: "",
      recipeType: "",
      about: "",
    },
    validationSchema: formValidationSchema,

    onSubmit: async (values) => {
      try {
        alert("data edited successfully");
        navigate("/list");
        await axios.patch(`${Config.api}/recipe/${id}`, values);

        // console.log(values)
      } catch (error) {
        console.log(error);
      }
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
    const copySteps = [...step];
    copySteps.splice(index, 1);
    setStep(copySteps);
    formik.values.step.splice(index, 1);
  }

  if (!details) {
    return (
      <div className="load">
        <img
          src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif"
          alt="loading"
        />
      </div>
    );
  } else
    return (
      <>
        <div className="formContainer">
          <form onSubmit={formik.handleSubmit}>
            <div className="fieldBox">
              <label>Recipe Name</label>
              <input
                type="text"
                name="recipeName"
                placeholder="Enter Recipe Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipeName}
              />
              <small>
                {formik.errors.recipeName && formik.touched.recipeName
                  ? formik.errors.recipeName
                  : null}
              </small>
            </div>
            <div className="fieldBox">
              <label>Poster Link</label>
              <input
                type="url"
                name="recipePoster"
                placeholder="Enter Recipe Poster"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipePoster}
              />
              <small>
                {formik.errors.recipePoster && formik.touched.recipePoster
                  ? formik.errors.recipePoster
                  : null}
              </small>
            </div>

            <div className="fieldBox">
              <label>Cooking Time</label>
              <input
                type="number"
                name="cookingTime"
                placeholder="Enter Cooking Time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cookingTime}
              />
              <small>
                {formik.errors.cookingTime && formik.touched.cookingTime
                  ? formik.errors.cookingTime
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
                      name={`step[${index}]`}
                      placeholder="Add Step"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.step[index]}
                      //   required
                    />
                    <button
                      className="delete"
                      type="button"
                      onClick={(e) => removeInputField(index, e)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <small>
                      {formik.errors.step && formik.touched.step
                        ? formik.errors.step
                        : null}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ingName}
                />

                <input
                  type="number"
                  name="ingQty"
                  placeholder="Ingredient Quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ingQty}
                />
              </div>
            </div>
            <div>
              <small>
                {formik.errors.ingName && formik.touched.ingName
                  ? formik.errors.ingName
                  : null}
              </small>
              <small>
                {formik.errors.ingQty && formik.touched.ingQty
                  ? formik.errors.ingQty
                  : null}
              </small>
            </div>

            <div className="fieldBox">
              <h3>Recipe Type</h3>
              <div>
                <label htmlFor="veg">Veg</label>
                <input
                  className="inputField"
                  type="radio"
                  name="recipeType"
                  //   defaultValue={formik.values.recipeType=="Veg"}
                  defaultChecked={details.recipeType == "veg"}
                  value="veg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="veg"
                />{" "}
                <label htmlFor="nonveg">Non Veg</label>
                <input
                  className="inputField"
                  type="radio"
                  name="recipeType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="nonveg"
                  defaultChecked={details.recipeType == "nonveg"}
                  //   defaultValue={formik.values.recipeType=="Veg"}
                  id="nonveg"
                />{" "}
              </div>
              <small>
                {formik.errors.recipeType && formik.touched.recipeType
                  ? formik.errors.recipeType
                  : null}
              </small>
            </div>
            <div className="fieldBox">
              <label>About</label>
              <textarea
                htmlFor="about"
                type="textarea"
                name="about"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                id="about"
              />
              <small>
                {formik.errors.about && formik.touched.about
                  ? formik.errors.about
                  : null}
              </small>
            </div>
            <button type="submit">Add Recipe</button>
          </form>
        </div>
      </>
    );
}

export default Edit;
