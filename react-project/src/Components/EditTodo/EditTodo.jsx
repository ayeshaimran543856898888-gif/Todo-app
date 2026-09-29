import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";

const EditTodo = ({ todo, setshowEdit, updateTodo }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(todo?.title || "");
  const [detail, setDetail] = useState(todo?.detail || "");

  const handleUpdate = () => {
    if (title === "" || detail === "") {
      return;
    }

    updateTodo(todo.id, title, detail);
    setshowEdit(null);
  };

  return (
    <>
      <div className="w-105 h-150 bg-[#e8e8fa] rounded-xl shadow-xl overflow-hidden">
        <div className="bg-[#9999e8] text-white p-6 rounded-t-xl flex justify-between items-center">
          <h2>Edit Task</h2>

          <div className="w-11 h-11 border-2 border-white rounded-lg flex items-center justify-center">
            <FaCalendarDays />
          </div>
        </div>

        <div className="p-6">
          <label className="text-sm text-gray-500">Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full mt-2 mb-6 px-4 py-3 bg-white rounded-xl outline-none"
          />

          <label className="text-sm text-gray-500">Detail</label>

          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Enter detail"
            className="w-full mt-2 mb-6 px-4 py-3 bg-white rounded-xl outline-none h-32 resize-none"
          />
          <div className="flex justify-between">
            <button
              onClick={handleUpdate}
              className="w-40 h-14 bg-[#9999e8] text-white rounded-xl"
            >
              UPDATE TODO
            </button>

            <button
              onClick={() => {
                setshowEdit(null);
                navigate("/");
              }}
              className="w-40 h-14 bg-[#9999e8] text-white rounded-xl"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
