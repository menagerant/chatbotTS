"use client";

import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <div className="z-40 fixed top-0 w-full px-5 py-3 flex items-center justify-between bg-white bg-opacity-60 backdrop-blur-md">
      <div className="flex gap-1 items-center">
        <ChevronLeft size={26} color="#037AFF" />
        <p className="text-[#037AFF]">Retour</p>
      </div>

      <div className="flex flex-col text-center">
        <h2 className="text-lg font-semibold p-0">Manon</h2>
        <p className="text-xs text-[#797B76]">en ligne aujourd'hui</p>
      </div>

      <Avatar className="w-12 h-12 ml-4">
        <AvatarImage src="/manon.png" alt="Manon" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </div>
  );
}
