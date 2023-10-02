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
    <div className="z-40 fixed top-0 w-full px-5 py-3 flex items-center justify-between bg-white bg-opacity-60 backdrop-blur-md">
      <div className="flex gap-1 items-center cursor-pointer">
        <DialogTrigger
          asChild
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatPopupClics(chatId);
            }
          }}
        >
          <ChevronLeft size={26} color="#037AFF" />
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
          <p className="text-[#037AFF]">Retour</p>
        </DialogTrigger>
      </div>

      <div className="flex flex-col text-center">
        <h2 className="text-lg font-semibold p-0">Manon</h2>
        <p className="text-xs text-[#797B76]">en ligne aujourd'hui</p>
      </div>

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
    </div>
  );
}
