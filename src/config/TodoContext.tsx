"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "./axiosInstance";
import { errorMessageToast, successMessageToast } from "./toastConfig";

export type Todo = {
  title: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  content?: string;
  _id: string;
};

type TodoContextType = {
  todos: Todo[];
  fetchTodos: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/todo/list");
      setTodos(response.data.data);
      response.data.success && successMessageToast(response.data.message);
    } catch (error: any) {
      errorMessageToast(error.response?.data?.message ?? "Error");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
