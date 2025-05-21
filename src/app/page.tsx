"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Button variant="filled" onClick={() => router.push("/auth/login")}>
        Login
      </Button>
    </div>
  );
}
