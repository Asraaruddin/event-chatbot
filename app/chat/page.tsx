"use client";

import React, { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import AnnouncementsFeed from "@/components/AnnouncementsFeed"; // ✅ Real-time announcements

export default function ChatPage() {
  const [groupId, setGroupId] = useState("default");
  const [eventName, setEventName] = useState("Boomi Hackathon 2025"); // ✅ Default event name

  // ✅ Avoid hydration mismatch by reading window params only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const group = urlParams.get("group") || "default";
      const event = urlParams.get("event") || "Boomi Hackathon 2025";
      setGroupId(group);
      setEventName(event);
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      {/* ✅ Top Marquee Banner */}
      <MarqueeBanner />

      {/* ✅ Real-time Announcements Section */}
      <AnnouncementsFeed />

      {/* ✅ Main Chat Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 w-full">
        {/* ✅ Use state values here, not hardcoded */}
        <ChatWindow groupId={groupId} eventName={eventName} />
      </div>
    </main>
  );
}
