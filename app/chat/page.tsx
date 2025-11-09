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
        flex flex-col 
        min-h-screen w-full 
        bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 
        text-white
        overflow-hidden
      "
    >
      {/* 🔹 Top Banner */}
      <section className="w-full sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <MarqueeBanner />
      </section>

      {/* 🔹 Main Body - Flexible layout */}
      <div
        className="
          flex flex-col md:flex-row 
          flex-1 w-full 
          max-w-7xl mx-auto 
          overflow-hidden
        "
      >
        {/* 🔹 Announcements Section */}
        <section
          className="
            w-full md:w-1/3 lg:w-1/4 
            border-b md:border-b-0 md:border-r border-gray-800 
            overflow-y-auto
            max-h-[calc(100vh-5rem)]
            p-3 sm:p-4 
            bg-gray-900/40
            backdrop-blur-sm
          "
        >
          <h3 className="text-gray-300 text-sm font-semibold mb-2">
            📢 Latest Announcements
          </h3>
          <AnnouncementsFeed />
        </section>

        {/* 🔹 Chat Window Section */}
        <section
          className="
            flex-1 flex items-center justify-center 
            bg-transparent 
            p-2 sm:p-4 md:p-6 
            overflow-hidden
          "
        >
          <div
            className="
              w-full 
              max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
              h-[85vh] sm:h-[80vh] md:h-[78vh]
              flex items-center justify-center
            "
          >
            <ChatWindow
              groupId={groupId}
              eventName={eventName}
              userName={userName}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
