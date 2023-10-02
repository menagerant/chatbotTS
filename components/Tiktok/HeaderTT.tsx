"use client";

import { ChevronLeft, Flag, MoreHorizontal, Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

export default function Header() {
  //update user popup clics
  const updateChatPopupClics = async (chatId: string) => {
    const response = await fetch("/api/chat/update/popupclics", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatId),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="z-40 fixed top-0 w-full px-5 py-3 flex items-center justify-between bg-[#F8F8F8] border-b">
      <div className="flex gap-3 items-center">
        <DialogTrigger
          asChild
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatPopupClics(chatId);
            }
          }}
        >
          <ChevronLeft size={26} className="cursor-pointer" />
        </DialogTrigger>
        <DialogTrigger
          asChild
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatPopupClics(chatId);
            }
          }}
        >
          <Avatar className="w-12 h-12 ml-4 cursor-pointer">
            <AvatarImage src="/manon.png" alt="Manon" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <div>
          <div className="text-lg font-semibold">Manon</div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <DialogTrigger
          asChild
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatPopupClics(chatId);
            }
          }}
        >
          <Button className="bg-transparent p-0 hover:bg-transparent hover:opacity-90">
            <Flag size={26} color="black" />
          </Button>
        </DialogTrigger>
        <DialogTrigger
          asChild
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatPopupClics(chatId);
            }
          }}
        >
          <Button className="bg-transparent p-0 hover:bg-transparent hover:opacity-90">
            <MoreHorizontal size={26} color="black" />
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}
