"use client";

import { Button, Menu } from "@mantine/core";
import { getFromAppStorage } from "config/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const value = getFromAppStorage("token");
    setToken(value ?? null);
  }, []);

  return (
    <div className="h-full flex justify-between items-center p-4">
      <div className="font-extrabold text-2xl">TODO</div>
      <Button
        onClick={() => router.push(token ? "/" : "/auth/login")}
        color="black"
      >
        {token ? "Profile" : "Login"}
      </Button>

      {/* <Menu shadow="md" width={200}>
        <Menu.Target>
          <button className="flex justify-between items-start ">
            {userName}
            <RiArrowDropDownLine size={20} className="mt-0.5" />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item disabled leftSection={<TbSettings />}>
            Settings
          </Menu.Item>
          <Menu.Item
            leftSection={<HiOutlineChatBubbleOvalLeft />}
            onClick={() => navigate(APP_ROUTES.CONNECTORS.path)}
          >
            Connector
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={<AiOutlineClear />}
            onClick={() => setConfirmModalOpened(true)}
          >
            Clear Cache
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<RiLogoutCircleLine />}
            onClick={() => setLogoutModalOpened(true)}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu> */}
    </div>
  );
}
