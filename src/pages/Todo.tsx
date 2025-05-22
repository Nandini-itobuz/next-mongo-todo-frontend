import React, { useState } from "react";
import { ListType } from "./TodoList";
import axiosInstance from "config/axiosInstance";
import { errorMessageToast, successMessageToast } from "config/toastConfig";
import { MdDeleteOutline } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";

let editTodoSchema = y.object({
  title: y.string().required("Title is required"),
});

type EditHandleType = {
  title: string;
};

export default function Todo({ item }: { item: ListType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editTodoSchema) });

  const [value, setValue] = useState<ListType>(item);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModal, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const upadteTodo = async (data: { completed?: boolean; title?: string }) => {
    try {
      const response = await axiosInstance.put(`/todo/${value._id}`, {
        ...data,
      });
      response.data.success && successMessageToast(response.data.message);
      setValue(response.data.data);
    } catch (error: any) {
      errorMessageToast(error.response?.data?.message ?? "Error");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/todo/${value._id}`);
      response.data.success && successMessageToast(response.data.message);
    } catch (error: any) {
      errorMessageToast(error.response?.data?.message ?? "Error");
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between gap-2 px-8 py-4 rounded-2xl shadow-md hover:shadow-xl  ${
          value.completed ? " bg-blue-50" : " bg-gray-100"
        }`}
      >
        <div className="flex items-start justify-between gap-2 w-full ">
          <label className="items-center cursor-pointer py-0.5">
            <input
              type="checkbox"
              checked={value.completed}
              disabled={value.completed}
              onChange={(e) =>
                upadteTodo({ completed: e.currentTarget.checked })
              }
              className={`appearance-none cursor-pointer w-5 h-5 rounded-full border-3  border-blue-600 checked:bg-blue-600`}
            />
          </label>

          <div
            className={` ${
              value.completed ? "line-through" : ""
            } break-words w-5/6 font-semibold`}
          >
            {value.title}
          </div>

          <div className=" flex justify-between items-center gap-2">
            {!value.completed && (
              <button
                disabled={value.completed}
                onClick={open}
                className="flex rounded-full items-center gap-2 p-2 bg-black hover:bg-gray-700 text-white hover:cursor-pointer"
              >
                <VscEdit size={12} />
              </button>
            )}
            <button
              onClick={deleteOpen}
              className="flex rounded-full items-center gap-2 p-2 bg-black hover:bg-gray-700 text-white hover:cursor-pointer"
            >
              <MdDeleteOutline size={12} />
            </button>
          </div>
        </div>
      </div>

      <Modal
        centered
        opened={opened}
        withCloseButton={false}
        onClose={close}
        title={<div className=" font-bold text-blue-500">Update Modal</div>}
      >
        <form
          onSubmit={handleSubmit((data: EditHandleType) => {
            upadteTodo(data);
            close();
          })}
        >
          <TextInput
            {...register("title")}
            label="Todo Title"
            defaultValue={value.title}
            error={errors.title?.message}
          />

          <div className=" flex gap-4">
            <Button
              onClick={close}
              className=" flex-1/2"
              ms={"auto"}
              mt={20}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" className=" flex-1/2" ms={"auto"} mt={20}>
              Save
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        opened={deleteModal}
        onClose={deleteClose}
        withCloseButton={false}
        title={
          <div className="text-lg font-semibold text-red-600">
            Confirm Delete
          </div>
        }
        centered
      >
        <div className="text-sm text-gray-800 mb-6">
          Are you sure you want to delete? This action cannot be undone.
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1 rounded-lg"
            variant="default"
            onClick={deleteClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-lg"
            color="red"
            onClick={() => {
              handleDelete();
              deleteClose();
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
