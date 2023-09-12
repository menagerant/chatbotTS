import { Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export default function Header() {
  return (
    <div className="w-full md:w-1/2 fixed px-5 py-3 bg-white shadow-md flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10">
          <Avatar>
            <AvatarImage src="magalieb.png" alt="Magalie B." />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          <div className="absolute top-10 left-12 w-4 h-4 bg-green-500 rounded-full border-2 border-solid border-white"></div>
        </div>

        <div className="flex flex-col">
          <div className="text-lg font-semibold">Magalie B.</div>
          <div className="text-xs font-light text-slate-500">
            En ligne maintenant
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DialogTrigger asChild>
          <Button className="bg-transparent p-0 hover:bg-transparent disabled:opacity-70">
            <Phone color="#2563eb" size={24} strokeWidth={1} fill="#2563eb" />
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button className="bg-transparent p-0 hover:bg-transparent disabled:opacity-70">
            <Video color="#2563eb" size={30} strokeWidth={1} fill="#2563eb" />
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}
