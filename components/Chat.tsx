"use client";

import { forbiddenSentences } from "../app/helpers/constants/forbidden_sentences";
import { systemPrompt } from "../app/helpers/constants/system_prompt";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import { Camera, Image as ImageIcon, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { ChatGPTMessage } from "@/lib/openai";
import { DialogTrigger } from "./ui/dialog";
import Image from "next/image";

export default function Chat() {
  // variables states
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    { role: "system", content: systemPrompt },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioRecording, setAudioRecording] = useState<boolean>(false);
  const [userCity, setUserCity] = useState<string>("Paris");

  // variables const
  const limit_reponses = 10;
  const ref_limit = useRef<HTMLButtonElement>(null);
  const ref_scroll = useRef<null | HTMLDivElement>(null);
  const timeByCaracter = 100;

  // get chat history function
  const historyChat = async (chatId: string) => {
    const response = await fetch("/api/chat/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatId),
    });
    const data = await response.json();
    console.log(data);
    if (data?.messages) {
      const msg = JSON.parse(data.messages);
      setMessages(msg);
    }
  };

  //update user last connection
  const updateChat = async (chatId: string) => {
    const response = await fetch("/api/chat/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: chatId, messages: messages }),
    });
    const data = await response.json();
    console.log(data);
  };

  // create new user function
  const createNewChat = async () => {
    const chatId = Math.floor(Math.random() * Date.now()).toString(36);
    console.log(chatId);
    localStorage.setItem("dating_chatbot_chatId", chatId);
    const response = await fetch("/api/chat/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatId),
    });
    const data = await response.json();
    console.log(data);
  };

  // create or get chat memory
  useEffect(() => {
    let chatId = localStorage.getItem("dating_chatbot_chatId");
    console.log(chatId);
    if (chatId) {
      //get user history
      console.log("get history chat");
      historyChat(chatId);
    } else {
      //create user
      console.log("create new user");
      createNewChat();
    }
  }, []);

  // update chat memory
  useEffect(() => {
    if (messages.length > 1) {
      const chatId = localStorage.getItem("dating_chatbot_chatId");
      if (chatId) {
        console.log("update chat");
        updateChat(chatId);
      } else {
        console.log("chat memory lost");
      }
    }
  }, [messages.length]);

  // wait until user stop typing
  useEffect(() => {
    if (isLoading) {
      console.log("wait next round");
    } else {
      const timer = setTimeout(() => {
        console.log("stop tying");
        if (messages[messages.length - 1].role === "user") {
          setIsLoading(true);
          console.log("messages", messages);
          console.log("call api");
          callGPTApi();
        }
      }, 5000 + 5000 * Math.random());
      return () => clearTimeout(timer);
    }
  }, [input]);

  // Get user location with ip address
  useEffect(() => {
    const getLocation = async () => {
      //const response = await fetch("/api/userlocation");
      try {
        const response = await fetch(
          "https://api.geoapify.com/v1/ipinfo?apiKey=0913a545ed2843e2ba722a620df262c7"
        );
        const data = await response.json();
        setUserCity(data.city.name);
      } catch (error) {
        console.log("error", error);
      }
    };
    getLocation();
  }, []);

  // scroll down when new message
  useEffect(() => {
    ref_scroll.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length, isLoading]);

  // add new message when send button click
  const submit = (input: string) => {
    if (input !== "") {
      const message: ChatGPTMessage = {
        role: "user",
        content: input,
      };
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

  // GPT-3.5 api function
  async function callGPTApi() {
    setIsLoading(true);

    console.log("messages", messages);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    });
    const data = await response.json();
    console.log(data);

    if (data === "error") {
      callGPTApi();
    } else {
      let text = data.choices[0].message.content;
      console.log("original response", text);

      let reFetch = false;
      for (const line of forbiddenSentences.split(/[\n]/)) {
        if (text.includes(line)) {
          console.log("phrase  interdite : ", line);
          reFetch = true;
        }
      }

      if (reFetch) {
        console.log("reFetch : ", reFetch);
        callGPTApi();
      } else {
        text = text.replace("[", "");
        text = text.replace("]", "");
        text = text.replace(":", "");
        text = text.replace("(", "");
        text = text.replace(")", "");
        text = text.replace(",", "");
        text = text.replace(". ", "=");
        text = text.replace('"', "");
        text = text.replace("Maison", userCity);
        text = text.replace("<<Maison>>", userCity);
        text = text.replace("Magalie envoie une photo", "<<Photo>>");
        text = text.replace("Photo", "<<Photo>>");
        text = text.replace("IMAGE", "<<Photo>>");
        text = text.replace("Audio", "<<Audio>>");

        console.log("replace response", text);

        let multipleText =
          text.split(/[<<>>=]/).length > 0 ? text.split(/[<<>>=]/) : [text];
        multipleText = multipleText.filter((item: string) => item !== "");
        console.log("split text", multipleText);

        let waitingTime = 0;
        for (let [i, subText] of multipleText.entries()) {
          if (subText.includes("Photo")) {
            waitingTime = waitingTime + 7000;
          } else if (subText.includes("Audio")) {
            setAudioRecording(true);
            waitingTime = waitingTime + 7000;
          } else {
            waitingTime = waitingTime + subText.length * timeByCaracter;
          }

          console.log(waitingTime, subText.length * timeByCaracter);

          const message: ChatGPTMessage = {
            role: "assistant",
            content: subText,
          };
          console.log(message);

          setTimeout(() => {
            setMessages((prev) => [...prev, message]);
            if (message.content === "Audio") {
              setAudioRecording(false);
            }
            if (i === multipleText.length - 1) {
              setIsLoading(false);
            }
          }, waitingTime);
        }
      }
    }
  }

  return (
    <>
      {/*Chat messages section*/}

      <div
        className={`fixed bottom-0 max-h-full w-full px-5 flex flex-col gap-2 overflow-scroll overscroll-contain`}
      >
        <div className="min-h-[4.25rem]" />
        {messages.map((message, index) =>
          message.role === "user" ? (
            // user message
            <div key={index} className="flex w-full justify-end">
              <div className="w-fit max-w-[60%]  px-3 py-2 bg-primary text-white rounded-2xl">
                {message.content}
              </div>
            </div>
          ) : message.role === "assistant" ? (
            // assistant message
            <div key={index} className="flex w-full justify-start">
              {message.content.includes("Photo") ? (
                <div className="w-fit max-w-[60%] bg-primary-foreground rounded-2xl">
                  <Image
                    className="rounded-2xl"
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
                <div className="w-fit max-w-[60%] bg-primary-foreground rounded-2xl">
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
              ) : (
                <div className="w-fit max-w-[60%] bg-primary-foreground px-3 py-2 rounded-2xl">
                  {message.content}
                </div>
              )}
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
        {isLoading &&
          (audioRecording ? (
            // audio recording anmation
            <div className="flex w-full justify-start">
              <div className="w-fit max-w-[60%] bg-primary-foreground px-3 py-3 rounded-2xl text-slate-500">
                Enregistrement d'un audio...
              </div>
            </div>
          ) : (
            // loading animation
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
          ))}
        <div className="min-h-[4rem]" />
        <div ref={ref_scroll} />
      </div>

      {/*Chat input section*/}

      <div className="fixed bottom-0 w-full px-5 py-3 flex items-end gap-3 bg-white/70 backdrop-blur-lg">
        <Button
          className="text-xs bg-red-500 hover:bg-red-600"
          onClick={() => {
            console.log("local storage cleared");
            localStorage.clear();
            setMessages([{ role: "system", content: systemPrompt }]);
            console.log("create new user");
            createNewChat();
          }}
        >
          Reset Chat
        </Button>
        <DialogTrigger asChild>
          <Button className="bg-transparent p-0 hover:bg-transparent hover:opacity-90">
            <Camera color="#2563eb" size={26} strokeWidth={2.4} />
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            ref={ref_limit}
            className="bg-transparent p-0 hover:bg-transparent hover:opacity-90"
          >
            <ImageIcon color="#2563eb" size={24} strokeWidth={2.4} />
          </Button>
        </DialogTrigger>

        <TextareaAutosize
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              submit(input);
            }
          }}
          maxRows={4}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          autoFocus
          disabled={
            isLoading ||
            messages.filter((m) => m.role === "assistant").length >
              limit_reponses
          }
          placeholder="Aa"
          className="rounded-2xl disabled:opacity-50 resize-none w-full border-0 bg-primary-foreground focus:ring-0"
        />

        <Button
          onClick={() => {
            submit(input);
          }}
          disabled={isLoading}
          className="bg-transparent p-0 hover:bg-transparent hover:opacity-90 disabled:opacity-70"
        >
          <SendHorizonal color="#2563eb" size={24} strokeWidth={2.4} />
        </Button>
        {messages.filter((m) => m.role === "assistant").length >
          limit_reponses && (
          <div
            className="absolute bottom-0 right-0 w-3/4 h-[65px]"
            onClick={() => ref_limit.current?.click()}
          ></div>
        )}
      </div>
    </>
  );
}
