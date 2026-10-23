import { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

const AddTodo = ({ setShowAdd, addTodo }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleAdd = () => {
    if (title === "" || detail === "") {
      return;
    }

    addTodo(title, detail);
  };

  return (
    <div className="w-105 h-150 bg-[#e8e8fa] rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#9999e8] text-white p-6 flex items-center gap-5">
        <button onClick={() => setShowAdd(false)}>
          <FaArrowLeft />
        </button>

        <h2>Add Todo</h2>
      </div>

      <div className="p-6 bg-[#e8e8fa] ">
        <label className="text-sm text-gray-500">Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full mt-2 mb-6 px-4 py-3 rounded-xl outline-none"
        />

        <label className="text-sm text-gray-500">Detail</label>

        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Enter detail"
          className="w-full mt-2 mb-8 px-4 py-3 rounded-xl outline-none h-32 resize-none"
        />

        <button
          onClick={handleAdd}
          className="w-full h-14 bg-[#9999e8] text-white rounded-xl flex items-center justify-center gap-3"
        >
          <FaPlus />
          ADD TODO
        </button>
      </div>
    </div>
  );
};
export default AddTodo;
