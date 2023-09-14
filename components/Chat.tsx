"use client";

import { systemPrompt } from "../app/helpers/constants/system_prompt";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import { Camera, Image, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { ChatGPTMessage } from "@/lib/openai";
import { DialogTrigger } from "./ui/dialog";

export default function Chat() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    { role: "system", content: systemPrompt },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const limit = 9;
  const ref_limit = useRef<HTMLButtonElement>(null);
  const ref_scroll = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length) {
      ref_scroll.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      setTimeout(() => {
        openai();
      }, 1000 + 5000 * Math.random());
    }
  }, [messages.length]);

  async function submit(input: string) {
    const message: ChatGPTMessage = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, message]);
    setInput("");
  }

  async function openai() {
    console.log(messages);
    setIsLoading(true);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    });
    const data = await response.json();
    if (data === "error") {
      openai();
    } else {
      const text = data.choices[0].message.content;
      const message: ChatGPTMessage = {
        role: "assistant",
        content: text,
      };
      const temps =
        text.includes("<<Photo>>") ||
        text.includes("IMAGE") ||
        text.includes("<<Audio>>")
          ? 5000 + text.length * 30
          : text.length * 30;
      console.log(temps);
      setTimeout(() => {
        setIsLoading(false);
        setMessages((prev) => [...prev, message]);
      }, temps);
    }
  }

  return (
    <div className="w-full flex flex-col gap-5 justify-end px-5">
      <div className="flex flex-col w-full gap-2 overflow-auto">
        {messages.map((message, index) =>
          message.role === "system" ? (
            <div key={index} className="w-full mt-[100px] bg-red-100"></div>
          ) : message.role === "user" ? (
            <div key={index} className="flex w-full justify-end">
              <div className="w-fit max-w-[60%]  px-3 py-2 bg-primary text-white rounded-2xl">
                {message.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex w-full justify-start">
              <div className="w-fit max-w-[60%] bg-primary-foreground px-3 py-2 rounded-2xl">
                {message.content
                  .replace("[", "")
                  .replace("]", "")
                  .replace('"', "")}
              </div>
            </div>
          )
        )}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="w-fit max-w-[60%] bg-primary-foreground px-3 py-3 rounded-2xl flex items-end gap-1 h-[40px]">
              <div
                key={"rond1"}
                className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full"
              />
              <div
                key={"rond2"}
                className="animate-bounce delay-100 w-1.5 h-1.5 bg-slate-500 rounded-full"
              />
              <div
                key={"rond3"}
                className="animate-bounce delay-200 w-1.5 h-1.5 bg-slate-500 rounded-full"
              />
            </div>
          </div>
        )}
        <div ref={ref_scroll} />
      </div>

      <div className="flex items-end gap-3 py-3">
        <DialogTrigger asChild>
          <Button className="bg-transparent p-0 hover:bg-transparent disabled:opacity-70">
            <Camera color="#2563eb" size={26} strokeWidth={2.4} />
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            ref={ref_limit}
            className="bg-transparent p-0 hover:bg-transparent disabled:opacity-70"
          >
            <Image color="#2563eb" size={24} strokeWidth={2.4} />
          </Button>
        </DialogTrigger>

        <TextareaAutosize
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(input);
            }
          }}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          disabled={isLoading || messages.length > limit}
          placeholder="Aa"
          className="rounded-2xl disabled:opacity-50 resize-none w-full border-0 bg-primary-foreground focus:ring-0"
        />

        <Button
          onClick={() => {
            submit(input);
          }}
          disabled={input === ""}
          className="bg-transparent p-0 hover:bg-transparent disabled:opacity-70"
        >
          <SendHorizonal color="#2563eb" size={24} strokeWidth={2.4} />
        </Button>
        {messages.length > limit && (
          <div
            className="absolute w-full h-[100px] left-0 bottom-0"
            onClick={() => ref_limit.current?.click()}
          ></div>
        )}
      </div>
    </div>
  );
}
