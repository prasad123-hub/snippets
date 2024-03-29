// Radix UI Dropdown menu component
"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { appwrite } from "@/appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function UserDropdown({ user }: any) {
  const router = useRouter();

  const handleLogout = () => {
    const promise = appwrite.account.deleteSession("current");
    promise.then(
      function (response) {
        toast.success("Logged out successfully!");
        router.push("/");
      },
      function (error) {
        toast.error(error.message);
      }
    );
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <span className="capitalize">{user.name.split("")[0]}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group test-sm leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span className="font-bold mr-2 test-sm">Email:</span> {user.email}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet6" />
          <DropdownMenu.Item className="group text-sm leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
