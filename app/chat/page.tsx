"use client";

import React, { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import AnnouncementsFeed from "@/components/AnnouncementsFeed";

export default function ChatPage() {
  const [groupId, setGroupId] = useState("default");
  const [eventName, setEventName] = useState("Boomi Hackathon 2025");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const group = urlParams.get("group") || "default";
      const event = urlParams.get("event") || "Boomi Hackathon 2025";
      const name = urlParams.get("name") || "";
      setGroupId(group);
      setEventName(event);
      setUserName(name);
    }
  }, []);

  return (
    <main
      className="
        flex flex-col items-center justify-start 
        min-h-screen w-full 
        bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 
        text-white 
        overflow-x-hidden
      "
    >
      {/* Top Banner */}
      <section className="w-full sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <MarqueeBanner />
      </section>

      {/* Announcements Section */}
      <section className="w-full max-w-5xl px-3 sm:px-4 md:px-6 lg:px-8 mt-3 sm:mt-4 md:mt-6">
        <AnnouncementsFeed />
      </section>

      {/* Chat Window Section */}
      <section
        className="
          flex flex-col items-center justify-center 
          flex-1 w-full 
          px-2 sm:px-4 md:px-6
          mt-4 sm:mt-6 md:mt-8
          mb-6 sm:mb-8
        "
      >
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <ChatWindow groupId={groupId} eventName={eventName} userName={userName} />
        </div>
      </section>
    </main>
  );
}
