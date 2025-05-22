import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div className=" flex justify-center items-center m-auto h-[70vh]">
      <Button onClick={() => router.push("/todo")} color="black">
        Start Creating TODO's
      </Button>
    </div>
  );
}
