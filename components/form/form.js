import React, { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import AddUser from "../AddUser/AddUser";
import Success from "../success/success";
import UpdateUser from "../UpdateUser/updateUser";
import { useSelector } from "react-redux";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector(state => state.app.client.formId);

  return (
    <div className="container mx-auto py-5">
      {formId
        ? UpdateUser({ formId, formData, setFormData })
        : AddUser({ formData, setFormData })}
    </div>
  );
}

export default Form;
