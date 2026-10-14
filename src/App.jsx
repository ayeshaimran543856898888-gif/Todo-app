import React, { useState, useEffect } from "react";
import Todo from "./Components/Todo/Todo";
import AddTodo from "./Components/AddTodo/AddTodo";
import EditTodo from "./Components/EditTodo/EditTodo";
import CompletedTodo from "./Components/CompleteTodo/CompletedTodo";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Signupform from "./Components/Signupform/Signupform";
import Loginform from "./Components/Loginform/Loginform";

const App = () => {
  const [showAdd, setshowAdd] = useState(false);
  const [todos, setTodos] = useState([]);
  const [showEdit, setshowEdit] = useState(null);
  const [completedTodos, setCompletedTodos] = useState(() => {
    const savedTodos = localStorage.getItem("completedTodos");
    if (!savedTodos) {
      return [];
    }
    return JSON.parse(savedTodos).filter((todo) => todo !== null);
  });

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  useEffect(() => {
    fetch("http://localhost:3000/Todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = (title, detail) => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        detail: detail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo added:", data);

        setTodos([...todos, data]);
        setshowAdd(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const updateTodo = (id, title, detail) => {
    axios
      .put(`http://localhost:3000/todos/${id}`, {
        title: title,
        detail: detail,
      })
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        setshowEdit(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        console.log("Todo deleted:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const completedTodo = (todo) => {
    setCompletedTodos([...completedTodos, todo]);
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center p-6">
        <Routes>
          <Route path="/" element={<Signupform />} />
          <Route path="/Loginform" element={<Loginform />} />
          <Route
            path="/todo"
            element={
              <>
                {showEdit ? (
                  <EditTodo
                    todo={showEdit}
                    setshowEdit={setshowEdit}
                    updateTodo={updateTodo}
                  />
                ) : !showAdd ? (
                  <Todo
                    setshowAdd={setshowAdd}
                    setshowEdit={setshowEdit}
                    deleteTodo={deleteTodo}
                    completedTodo={completedTodo}
                    todos={todos}
                  />
                ) : (
                  <AddTodo setShowAdd={setshowAdd} addTodo={addTodo} />
                )}
              </>
            }
          />

          <Route
            path="/completed"
            element={<CompletedTodo completedTodos={completedTodos} />}
          />
        </Routes>
      </div>
    </>
  );
};
export default App;
