import { ChevronLeft, Flag, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <div className="z-40 fixed top-0 w-full px-5 py-3 flex items-center justify-between bg-[#F8F8F8] border-b">
      <div className="flex gap-3 items-center">
        <ChevronLeft size={26} />

        <Avatar className="w-12 h-12 ml-4">
          <AvatarImage src="/manon.png" alt="Manon" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>

        <div>
          <div className="text-lg font-semibold">Manon</div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Flag size={26} color="black" />
        <MoreHorizontal size={26} color="black" />
      </div>
    </div>
  );
}
