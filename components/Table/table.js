import React, { useEffect } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../../lib/helper";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAction,
  toggleChangeAction,
  updateAction,
} from "../../redux/reducer";

function Table() {
  const { isLoading, error, isError, data } = useQuery(["users"], getUsers);

  if (isLoading) return "Loading...";

  if (isLoading) return <div>loading data...</div>;

  if (isError) return <div>error</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-6 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Action</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, index) => (
          <TR data={obj} key={obj._id} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

function TR(props) {
  const visible = useSelector(state => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(props.data._id));
    if (visible) {
      dispatch(updateAction(props.data._id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(props.data._id));
    }
  };
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={props.data.avatar || "#"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {props.data.name || "Unknown"}
        </span>
      </td>
      <td className="px-16  py-2">
        <span>{props.data.email || "Unknown"}</span>
      </td>
      <td className="px-16  py-2">
        <span>{props.data.salary || "Unknown"}</span>
      </td>
      <td className="px-16  py-2">
        <span>{props.data.date || "Unknown"}</span>
      </td>
      <td className="px-16  py-2">
        <button className="cursor">
          <span
            className={`${
              props.data.status === "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {props.data.status || "Unknown"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color="rgb(34,197,74)" />
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color="rgb(244,63,94)" />
        </button>
      </td>
    </tr>
  );
}
