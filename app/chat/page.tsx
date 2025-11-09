"use client";

import React, { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import AnnouncementsFeed from "@/components/AnnouncementsFeed";

export default function ChatPage() {
  const [groupId, setGroupId] = useState("default");
  const [eventName, setEventName] = useState("Boomi Hackathon 2025");
  const [userName, setUserName] = useState(""); // ✅ new state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const group = urlParams.get("group") || "default";
      const event = urlParams.get("event") || "Boomi Hackathon 2025";
      const name = urlParams.get("name") || ""; // ✅ get name from URL
      setGroupId(group);
      setEventName(event);
      setUserName(name);
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <MarqueeBanner />
      <AnnouncementsFeed />
      <div className="flex flex-col items-center justify-center flex-1 px-4 w-full">
        {/* ✅ pass all three */}
        <ChatWindow groupId={groupId} eventName={eventName} userName={userName} />
      </div>
    </main>
  );
}
