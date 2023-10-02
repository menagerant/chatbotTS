"use client";

import {
  MessageSquarePlus,
  MousePointer,
  PictureInPicture2,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Overview } from "./Overview";
import { useEffect, useState } from "react";
import Summary from "./Summary";

export default function KPI() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <Tabs defaultValue="summary" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="tiktok">Chat Tiktok</TabsTrigger>
          <TabsTrigger value="telegram">Chat Telegram</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
