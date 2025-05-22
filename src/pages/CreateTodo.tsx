import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Textarea } from "@mantine/core";
import axiosInstance from "config/axiosInstance";
import { errorMessageToast, successMessageToast } from "config/toastConfig";
import React from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";

let createTodoSchema = y.object({
  title: y.string().required("Title is required"),
});

export default function CreateTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createTodoSchema) });

  const createTodo = async (data) => {
    try {
      const response = await axiosInstance.post(`/todo`, {
        title: data.title,
        completed: false,
      });
      response.data.success && successMessageToast(response.data.message);
    } catch (error: any) {
      errorMessageToast(error.response?.data?.message ?? "Error");
    }
  };

  return (
    <form
      className=" flex flex-col justify-center gap-2 items-end mb-8 px-8 py-4 bg-gray-50 rounded-2xl shadow-sm "
      onSubmit={handleSubmit(createTodo)}
    >
      <Textarea
        rows={4}
        {...register("title")}
        className=" w-full"
        label="Todo Title"
        placeholder="Write your task here"
        error={errors.title?.message}
      />
      <Button color="black" type="submit">
        Create
      </Button>
    </form>
  );
}
