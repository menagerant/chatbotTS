import { ChevronLeft, Flag, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

export default function Header() {
  return (
    <div className="z-40 fixed top-0 w-full">
      <div className="p-3 flex items-center justify-center bg-black">
        <Image
          className="w-[80%]"
          src="/logo.png"
          width={429}
          height={90}
          alt="logo"
          quality={100}
        />
      </div>
      <div className="px-5 py-3 flex items-center justify-between bg-[#F8F8F8] border-b">
        <div className="flex gap-3 items-center">
          <ChevronLeft size={26} />

          <Avatar className="w-12 h-12 ml-4">
            <AvatarImage src="/manon.png" alt="Manon" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          <div>
            <div className="text-lg font-semibold">Manon</div>
            <div className="flex items-center gap-1">
              <div className="bg-green-500 w-3 h-3 rounded-full" />
              <div className="text-xs text-secondary-foreground">
                Actuellement en ligne
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Flag size={26} color="black" />
          <MoreHorizontal size={26} color="black" />
        </div>
      </div>
    </div>
  );
}
