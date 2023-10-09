"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

export default function ChatTiktok() {
  const [chats, setChats] = useState([
    {
      id: "Loading",
      firstConnection: "000000",
      lastConnection: "...",
      messages: "",
      popupClics: 0,
      conversion: false,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentChat, setCurrentChat] = useState(10 ^ 100);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "System message",
    },
    {
      role: "user",
      content: "Clic on a user to display his chat.",
    },
    {
      role: "assistant",
      content: "Let's clic now!",
    },
  ]);

  useEffect(() => {
    const getChatsNumber = async () => {
      const response = await fetch("/api/chat/count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("tiktok"),
      });
      const data = await response.json();
      const total = data % 10 === 0 ? data / 10 : Math.floor(data / 10) + 1;
      setTotalPages(total);
    };
    getChatsNumber();
  }, []);

  useEffect(() => {
    const getChats = async () => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPage: currentPage, source: "tiktok" }),
      });
      const data = await response.json();
      console.log(data);
      setChats(data);
      console.log(data.length);
    };
    getChats();
  }, [currentPage]);

  return (
    <div className="grid grid-rows md:grid-cols-6 gap-2">
      <div className="md:col-span-2 space-y-1">
        <div className="w-full flex justify-between items-center">
          <Button
            className="bg-transparent hover:bg-transparent hover:opacity-70"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
          >
            <ChevronLeft size={20} color="black" />
          </Button>
          <p>{`${currentPage}/${totalPages}`}</p>
          <Button
            className="bg-transparent hover:bg-transparent hover:opacity-70"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            <ChevronRight size={20} color="black" />
          </Button>
        </div>
        {chats &&
          chats.map((chat, index) => (
            <Card
              key={index}
              className={`p-2 cursor-pointer ${
                currentChat === index && "border-black"
              }`}
              onClick={() => {
                setCurrentChat(index);
                setMessages(JSON.parse(chats[index].messages));
              }}
            >
              <div className="text-sm">
                {chat?.id} | {String(chat.lastConnection)}
              </div>
              <div className="flex gap-1">
                {chat.messages && (
                  <div className="py-1 px-2 rounded-full bg-blue-500 text-white text-xs">
                    {JSON.parse(chat.messages).length - 1} Messages
                  </div>
                )}
                {chat.popupClics > 0 && (
                  <div className="py-1 px-2 rounded-full bg-yellow-500 text-white text-xs">
                    {chat.popupClics} Popup
                  </div>
                )}
                {chat.conversion && (
                  <div className="py-1 px-2 rounded-full bg-green-500 text-white text-xs">
                    Conversion
                  </div>
                )}
              </div>
            </Card>
          ))}
      </div>
      <Card className="md:col-span-4 bg-[#F8F8F8] max-h-[80vh] p-5 space-y-3 overflow-scroll">
        {messages.map((message, index) =>
          message.role === "user" ? (
            // user message
            <div key={index} className="flex justify-end">
              <div
                className={`w-fit max-w-[60%] ${
                  (messages[index - 1].role === "assistant" ||
                    messages[index - 1].role === "system") &&
                  "rounded-t-2xl"
                } rounded-sm rounded-l-2xl bg-[#00B5D4] text-white px-3 py-2`}
              >
                {message.content}
              </div>
            </div>
          ) : message.role === "assistant" ? (
            // assistant message
            <div
              key={index}
              className="flex w-full justify-start items-end gap-1"
            >
              {!messages[index + 1] || messages[index + 1].role === "user" ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/manon.png" alt="Manon" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-8" />
              )}
              {message.content.includes("Photo") ? (
                <div
                  className={`w-fit max-w-[60%] ${
                    messages[index - 1].role === "user" && "rounded-t-2xl"
                  } rounded-sm rounded-r-2xl overflow-hidden`}
                >
                  <Image
                    src={`/photo${
                      messages
                        .slice(0, index + 1)
                        .filter(
                          (item) =>
                            item.role === "assistant" &&
                            item.content.includes("Photo")
                        ).length
                    }.png`}
                    alt={message.content}
                    width={1080}
                    height={1440}
                  />
                </div>
              ) : message.content.includes("Audio") ? (
                <div
                  className={`w-fit max-w-[60%] ${
                    messages[index - 1].role === "user" && "rounded-t-2xl"
                  } rounded-sm rounded-r-2xl overflow-hidden`}
                >
                  <audio
                    controls
                    src={`/audio${
                      messages
                        .slice(0, index + 1)
                        .filter(
                          (item) =>
                            item.role === "assistant" &&
                            item.content.includes("Audio")
                        ).length
                    }.m4a`}
                  />
                </div>
              ) : message.content.includes("Video") ? (
                <div
                  className={`w-fit max-w-[60%] ${
                    messages[index - 1].role === "user" && "rounded-t-2xl"
                  } rounded-sm rounded-r-2xl overflow-hidden`}
                >
                  <video
                    autoPlay
                    src={`/video${
                      messages
                        .slice(0, index + 1)
                        .filter(
                          (item) =>
                            item.role === "assistant" &&
                            item.content.includes("Video")
                        ).length
                    }.mov`}
                  />
                </div>
              ) : (
                <div
                  className={`w-fit max-w-[60%] ${
                    messages[index - 1].role === "user" && "rounded-t-2xl"
                  } rounded-sm rounded-r-2xl bg-white px-3 py-2`}
                >
                  {message.content}
                </div>
              )}
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
      </Card>
    </div>
  );
}
