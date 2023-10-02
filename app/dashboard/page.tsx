"use client";

import KPI from "@/components/Dashboard/KPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Dashboard() {
  const [password, setPassword] = useState<String>("");
  const [allow, setAllow] = useState<Boolean>(false);
  return (
    <div className="w-full h-screen">
      {allow || true ? (
        <KPI />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary-foreground">
          <div className="w-10/12 p-5 flex flex-col gap-10 bg-white shadow-md rounded-2xl">
            <div className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Dashboard
            </div>
            <div className="flex flex-col gap-5">
              <Label htmlFor="password">Please enter password</Label>
              <Input
                autoFocus
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                className="w-full"
                onClick={() => {
                  setAllow(password === "datingchatbot");
                  setPassword("");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
