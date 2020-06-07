import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import List from "../List";
import Form from "../Form";

import { getTodos, addTodo, updateTodo, deleteTodo } from "actions/todo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Todo = ({ todos, getTodos, addTodo, updateTodo, deleteTodo }) => {
  useEffect(() => {
    getTodos();
  }, []);

  const addTodoItem = async (label, dueDate) => {
    const date = dueDate;
    try {
      const { success } = await addTodo({
        label,
        dueDate: date,
        status: "active",
      });
      if (success) {
        toast.success("Todo added!");
      } else {
        throw new Error("API Failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to add todo!");
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const { success } = await updateTodo(id, { status: "complete" });
      if (success) {
        toast("Todo completed!");
      } else {
        throw new Error("API Failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to mark todo as done!");
    }
  };

  const deleteTodoItem = async (id) => {
    try {
      const { success } = await deleteTodo(id);
      if (success) {
        toast.warn("Completed item removed!");
      } else {
        throw new Error("API Failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to remove completed item!");
    }
  };

  return (
    <Container>
      <Form add={addTodoItem} />
      <List
        items={todos}
        markAsCompleted={markAsCompleted}
        deleteTodo={deleteTodoItem}
      />
      <ToastContainer />
    </Container>
  );
};

const mapStateToProps = ({ todos: { todos } }) => ({ todos });
const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: (payload) => dispatch(getTodos(payload)),
    addTodo: (payload) => dispatch(addTodo(payload)),
    updateTodo: (id, payload) => dispatch(updateTodo(id, payload)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
