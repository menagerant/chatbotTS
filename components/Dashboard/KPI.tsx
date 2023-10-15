"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ChatEchangeNude from "./ChatEchangeNude";
import ChatTelegram from "./ChatTelegram";
import ChatTiktok from "./ChatTiktok";
import Summary from "./Summary";

export default function KPI() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <Tabs defaultValue="summary" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="tiktok">Tiktok</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="echangenude">Echange Nude</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
        <TabsContent value="tiktok">
          <ChatTiktok />
        </TabsContent>
        <TabsContent value="telegram">
          <ChatTelegram />
        </TabsContent>
        <TabsContent value="echangenude">
          <ChatEchangeNude />
        </TabsContent>
      </Tabs>
    </div>
  );
}
