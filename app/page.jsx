"use client";

import Header from "@/components/Header";
import { systemPrompt } from "./helpers/constants/system_prompt";
import Chat from "@/components/Chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/2 h-screen p-10 bg-primary-foreground hidden md:flex flex-col gap-10 overflow-scroll">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The prompt:
        </h1>
        {systemPrompt}
      </div>
      <div className="w-full md:w-1/2 h-screen flex">
        <Dialog>
          <Header />
          <Chat />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Essai gratuit expiré</DialogTitle>
              <DialogDescription>
                Vous avez atteint le nombre maximum de messages gratuits.
                Cliquez sur le bouton pour continuer à discuter.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-6 py-3 items-center justify-between">
              <div>
                Vous avez échangé avec{" "}
                <span className="font-bold">Magalie B.</span> mais d autres
                filles vous attendent !
              </div>
              <div className="flex">
                <div className="w-10 h-10 bg-slate-500 rounded-full shadow-md mr-[-10px] overflow-hidden">
                  <Image
                    src="/magalieb.png"
                    width={100}
                    height={100}
                    alt="Magalie B."
                  />
                </div>
                <div className="w-10 h-10 bg-slate-500 rounded-full shadow-md mr-[-10px] overflow-hidden">
                  <Image
                    src="/manonv.png"
                    width={100}
                    height={100}
                    alt="Manon V."
                  />
                </div>
                <div className="w-10 h-10 bg-slate-500 rounded-full shadow-md mr-[-10px] overflow-hidden">
                  <Image
                    src="/sophiaj.png"
                    width={100}
                    height={100}
                    alt="Sophia J."
                  />
                </div>
                <div className="w-10 h-10 bg-slate-500 rounded-full shadow-md overflow-hidden">
                  <Image
                    src="/annat.png"
                    width={100}
                    height={100}
                    alt="Anna T."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button>Continuer à discuter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
