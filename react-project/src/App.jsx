import React, { useState, useEffect } from "react";
import Todo from "./Components/Todo/Todo";
import AddTodo from "./Components/AddTodo/AddTodo";
import EditTodo from "./Components/EditTodo/EditTodo";
import CompletedTodo from "./Components/CompleteTodo/CompletedTodo";
import { Routes, Route } from "react-router-dom";

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

  const addTodo = (title, detail) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      detail: detail,
    };

    setTodos([...todos, newTodo]);
    setshowAdd(false);
  };

  const updateTodo = (id, title, detail) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: title, detail: detail } : todo,
      ),
    );
    setshowEdit(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedTodo = (todo) => {
    setCompletedTodos([...completedTodos, todo]);
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center p-6">
        <Routes>
          <Route
            path="/"
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
