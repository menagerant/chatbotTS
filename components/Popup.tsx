"use client";

import Image from "next/image";
import { DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { ShieldCheck } from "lucide-react";

interface PopupParams {
  text: string;
}

export default function Popup({ text }: PopupParams) {
  //update user conversion
  const updateChatConversion = async (chatId: string) => {
    const response = await fetch("/api/chat/update/conversion", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatId),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <DialogContent className="flex flex-col items-center w-10/12 sm:max-w-[480px] p-8 bg-[#1D1D23] text-white text-center">
      <div className="relative">
        <Image
          src="/manon.png"
          width={110}
          height={110}
          alt="Manon"
          className="rounded-full opacity-80"
        />
        <div className="absolute -top-2 -left-2 w-[125px] h-[125px] rounded-full border-[3px] border-[#E95576]"></div>
        <ShieldCheck
          width={50}
          height={50}
          fill="#62C7D3"
          strokeWidth={1}
          className="absolute -bottom-3 -right-3"
        />
      </div>
      <p className="text-lg font-semibold mb-3">
        Vous devez certifier votre compte pour {text}
      </p>
      <div>
        <h2 className="text-2xl font-semibold text-[#E95576]">
          devenez premium sur EchangeNude
        </h2>
        <p className="text-sm">
          pour chatter avec Manon et tous les autres membres certifiés
        </p>
      </div>
      <DialogFooter>
        <Button
          className="bg-gradient-to-r from-[#812350] to-[#E95576] px-10 rounded-full border-2 border-[#E95576] hover:opacity-90"
          onClick={() => {
            const chatId = localStorage.getItem("dating_chatbot_chatId");
            if (chatId) {
              updateChatConversion(chatId);
            }
            window.location.href = "https://bit.ly/manon-invitation-lien";
          }}
        >
          Continuer à discuter
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
