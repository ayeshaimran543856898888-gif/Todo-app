import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import { MdDensitySmall } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

const Todo = ({
  setshowAdd,
  setshowEdit,
  deleteTodo,
  completedTodo,
  todos,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-105 h-150 bg-[#e8e8fa] rounded-xl shadow-xl overflow-hidden">
        <div className="bg-[#9999e8] text-white p-6 rounded-t-xl flex justify-between items-center">
          <h2>Todo App</h2>
          <div className="w-11 h-11 border-2 border-white rounded-lg flex items-center justify-center text-white">
            <FaCalendarDays />
          </div>
        </div>
        <div className="h-14 bg-white flex justify-around items-center text-[#9999e8] ">
          <div className="text-center">
            <div className="text-xl">
              <MdDensitySmall />
            </div>
            <p className="text-xs">ALL</p>
          </div>
          <div className="text-center">
            <button onClick={() => setshowAll(!showAll)}>
              <FaCheck
                onClick={() => navigate("/completed")}
                className="cursor-pointer"
              />
            </button>
            <p className="text-xs">Completed</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {(todos || []).map((todo) => (
            <div
              key={todo.id}
              className="h-12 bg-white rounded-2xl shadow-md px-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-[#7777b5]">
                  {todo.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{todo.detail}</p>
              </div>
              <div className="flex gap-5 text-[#9999e8] ">
                <IoPencil
                  onClick={() => setshowEdit(todo)}
                  className="cursor-pointer"
                />
                <MdDelete
                  onClick={() => deleteTodo(todo.id)}
                  className="cursor-pointer"
                />
                <CiCircleCheck
                  onClick={() => completedTodo(todo)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setshowAdd(true)}
          className="w-14 h-14 rounded-full bg-[#9999e8] text-white flex items-center justify-center text-xl shadow-lg mt-5 ml-auto mr-6"
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default Todo;
