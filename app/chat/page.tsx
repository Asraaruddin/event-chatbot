"use client";
import React from "react";
import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import GroupQRCode from "@/components/GroupQRCode";

export default function ChatPage() {
  const groupId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("group") || "default"
      : "default";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <MarqueeBanner />
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <GroupQRCode groupId={groupId} />
        <ChatWindow />
      </div>
    </main>
  );
}
