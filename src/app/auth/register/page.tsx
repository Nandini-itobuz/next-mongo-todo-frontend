"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput } from "@mantine/core";
import axiosInstance from "config/axiosInstance";
import { errorMessageToast, successMessageToast } from "config/toastConfig";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  let registerationSchema = y.object({
    username: y.string().required("Name is required"),
    email: y.string().required("Email is required").email("Invalid Email"),
    password: y
      .string()
      .required("Please enter password")
      .min(8, "password must be 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(registerationSchema) });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axiosInstance.post("/register", data);
      response.data.success && router.push("/auth/login");
      response.data.success && successMessageToast(response.data.message);
    } catch (error: any) {
      errorMessageToast(error.response.data.message ?? "Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center mx-2">
      <div className=" flex justify-center flex-col items-center xl:p-8 p-4 m-auto shadow-md rounded-xl max-w-md w-full ">
        <span className=" font-bold text-xl">Register</span>
        <span className=" text-xs text-gray-600 mb-8">
          Lorem ipsum dolor sit amet conse
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <TextInput
            {...register("username")}
            mt={8}
            label="Name"
            placeholder="Jhon Doe"
            error={errors.username?.message}
          />

          <TextInput
            {...register("email")}
            mt={8}
            label="Email"
            placeholder="abc@email.com"
            error={errors.email?.message}
          />

          <TextInput
            {...register("password")}
            mt={8}
            label="Password"
            placeholder="xxxxxxxx"
            error={errors.password?.message}
          />

          <div className="flex">
            <Button
              type="submit"
              color="black"
              mt={20}
              className=" w-1/2 flex ms-auto"
            >
              Register
            </Button>
          </div>
        </form>

        <span className=" text-xs text-gray-600 mt-8">
          Already a member?
          <Link className="font-bold text-black" href="/auth/login">
            {" "}
            Click{" "}
          </Link>
          here to login
        </span>
      </div>
    </div>
  );
}
