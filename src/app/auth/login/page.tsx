"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import axiosInstance from "config/axiosInstance";
import { setStore } from "config/store";
import { errorMessageToast, successMessageToast } from "config/toastConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  let loginSchema = y.object({
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
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosInstance.post("/login", data);
      const token = response.data.data;
      setStore({ token });
      response.data.success && router.push("/");
      response.data.success && successMessageToast(response.data.message);
    } catch (error: any) {
      errorMessageToast(error.response.data.message ?? "Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center mx-2">
      <div className=" flex justify-center flex-col items-center xl:p-8 p-4 m-auto shadow-md rounded-xl max-w-md w-full ">
        <span className="font-bold text-xl">Login</span>
        <span className=" text-xs text-gray-600 mb-8">
          Lorem ipsum dolor sit amet conse
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <TextInput
            {...register("email")}
            mt={8}
            label="Email"
            placeholder="abc@email.com"
            error={errors.email?.message}
          />

          <PasswordInput
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
              Login
            </Button>
          </div>
        </form>

        <span className="text-xs text-gray-600 mt-8">
          New Member?
          <Link className="font-bold text-black" href="/auth/register">
            {" "}
            Click{" "}
          </Link>
          here to register
        </span>
      </div>
    </div>
  );
}
