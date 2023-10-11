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
import { Overview } from "./Overview";
import { useEffect, useState } from "react";

export default function Summary() {
  const [totalUsers, setTotalUsers] = useState({
    today: 0,
    yesterday: 0,
  });
  const [totalConversions, setTotalConversions] = useState({
    today: 0,
    yesterday: 0,
  });
  const [averageMessages, setAverageMessages] = useState({
    today: 0,
    yesterday: 0,
  });
  const [averagePopupClics, setAveragePopupClics] = useState({
    today: 0,
    yesterday: 0,
  });
  useEffect(() => {
    const initializedData = async () => {
      // total users
      const totalUsers = await fetch("/api/chat/data/totalusers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Date()),
      });
      const totalUsersData = await totalUsers.json();
      setTotalUsers(totalUsersData);
      // total conversions
      const totalConversions = await fetch("/api/chat/data/totalconversions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Date()),
      });
      const totalConversionsData = await totalConversions.json();
      setTotalConversions(totalConversionsData);
      // average messages
      const averageMessages = await fetch("/api/chat/data/averagemessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Date()),
      });
      const averageMessagesData = await averageMessages.json();
      setAverageMessages(averageMessagesData);
      // average popup clics
      const averagePopupClics = await fetch("/api/chat/data/averagepopup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Date()),
      });
      const averagePopupClicsData = await averagePopupClics.json();
      setAveragePopupClics(averagePopupClicsData);
    };
    initializedData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users
              width={16}
              height={16}
              color="hsl(var(--muted-foreground))"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.today}</div>
            <p className="text-xs text-muted-foreground">
              +
              {(
                ((totalUsers.today - totalUsers.yesterday) * 100) /
                totalUsers.yesterday
              ).toFixed(2)}
              % from last day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversions
            </CardTitle>
            <MousePointer
              width={16}
              height={16}
              color="hsl(var(--muted-foreground))"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.today}</div>
            <p className="text-xs text-muted-foreground">
              +
              {(
                ((totalConversions.today - totalConversions.yesterday) * 100) /
                totalConversions.yesterday
              ).toFixed(2)}
              % from last day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Messages
            </CardTitle>
            <MessageSquarePlus
              width={16}
              height={16}
              color="hsl(var(--muted-foreground))"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageMessages.today.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((averageMessages.today - averageMessages.yesterday) * 100) /
                averageMessages.yesterday >=
              0
                ? `+${(
                    ((averageMessages.today - averageMessages.yesterday) *
                      100) /
                    averageMessages.yesterday
                  ).toFixed(2)}`
                : `${(
                    ((averageMessages.today - averageMessages.yesterday) *
                      100) /
                    averageMessages.yesterday
                  ).toFixed(2)}`}
              % from last day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Popup Clics
            </CardTitle>
            <PictureInPicture2
              width={16}
              height={16}
              color="hsl(var(--muted-foreground))"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averagePopupClics.today.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((averagePopupClics.today - averagePopupClics.yesterday) * 100) /
                averagePopupClics.yesterday >=
              0
                ? `+${(
                    ((averagePopupClics.today - averagePopupClics.yesterday) *
                      100) /
                    averagePopupClics.yesterday
                  ).toFixed(2)}`
                : `${(
                    ((averagePopupClics.today - averagePopupClics.yesterday) *
                      100) /
                    averagePopupClics.yesterday
                  ).toFixed(2)}`}
              % from last day
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Other KPIs</CardTitle>
            <CardDescription>To be definied...</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
