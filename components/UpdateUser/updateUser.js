import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useReducer } from "react";
import { BiBrush } from "react-icons/bi";
import { getUser, getUsers, updateUser } from "../../lib/helper";
import Success from "../success/success";

function UpdateUser({ formId, formData, setFormData }) {
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );

  const updateMutationn = useMutation(newData => updateUser(formId, newData), {
    onSuccess: async data => {
      // queryClient.setQueryData(["users"], old => [data]);
      queryClient.prefetchQuery(["users"], getUsers);
    },
  });

  const queryClient = useQueryClient();

  if (isLoading) return <div>loading...!</div>;
  if (isError) return <div>error</div>;

  const { name, salary, date, email, status } = data;

  const [firstname, lastname] = name ? name.split(" ") : formData;

  const handleSubmit = async e => {
    e.preventDefault();

    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });

    await updateMutationn.mutate(updated);
  };

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
          onChange={setFormData}
          defaultValue={firstname}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
          onChange={setFormData}
          defaultValue={lastname}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
          onChange={setFormData}
          defaultValue={email}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="salary"
          onChange={setFormData}
          defaultValue={salary}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="salary"
          onChange={setFormData}
          defaultValue={date}
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Active"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full w-4 h-4 border
             border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none
             transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
            defaultChecked={status === "Active"}
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full w-4 h-4 border
             border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none
             transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            onChange={setFormData}
            defaultChecked={status === "Inactive"}
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button
        className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md
       hover:border-yellow-400 hover:text-yellow-400 hover:bg-gray-50 "
      >
        Update
        <span className="px-1">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
}

export default UpdateUser;
