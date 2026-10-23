// import React from "react";
// import { FaCalendarDays } from "react-icons/fa6";

// const CompletedTodo = () => {
//   return (
//     <>
//       <div className="w-105 h-150 bg-[#e8e8fa] rounded-xl shadow-xl overflow-hidden">
//         <div className="bg-[#9999e8] text-white p-6 rounded-t-xl flex justify-between items-center">
//           <h2>Completed Task</h2>
//           <div className="w-11 h-11 border-2 border-white rounded-lg flex items-center justify-center text-white">
//             <FaCalendarDays />
//           </div>
//         </div>
//         {

//         }
//       </div>
//     </>
//   );
// };

// export default CompletedTodo;

import React from "react";

const CompletedTodo = ({ completedTodos }) => {
  return (
    <div className="w-105 bg-[#e8e8fa] rounded-xl p-5">
      <h2 className="text-xl font-bold text-[#7777b5] mb-4">
        Completed Tasks
      </h2>

      {completedTodos.map((todo,index) => (
        <div
          key={todo?.id ?? index}
          className="bg-white rounded-xl p-4 mb-3 shadow-md"
        >
          <h3 className="font-bold text-[#7777b5]">
            {todo.title}
          </h3>

          <p className="text-sm text-gray-500">
            {todo.detail}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodo;