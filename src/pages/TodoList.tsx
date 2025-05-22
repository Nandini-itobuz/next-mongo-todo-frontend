"use client";
import axiosInstance from "config/axiosInstance";
import { errorMessageToast, successMessageToast } from "config/toastConfig";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";

export type ListType = {
  title: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  content?: string;
  _id: string;
};

export default function TodoList() {
  const [list, setList] = useState<ListType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get("/todo/list");
        setList(response.data.data);
        response.data.success && successMessageToast(response.data.message);
      } catch (error: any) {
        errorMessageToast(error.response?.data?.message ?? "Error");
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="text-2xl font-bold mb-8">Your Todo List</div>

      <CreateTodo />

      {list.length === 0 ? (
        <p className="text-gray-500 text-xs">No todos found.</p>
      ) : (
        <ul className="space-y-4 max-h-[60vh] overflow-y-scroll">
          {list.map((item) => (
            <li key={item._id}>
              <Todo item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
