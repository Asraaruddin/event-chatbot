"use client";

import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import GroupQRCode from "@/components/GroupQRCode";

export default function Home() {
  const groupId = "hackathon2025";
  const eventName = "Boomi Hackathon 2025";

  return (
    <main className="flex flex-col min-h-screen bg-gray-950 text-white">
      
      {/* Marquee Banner */}
      <div className="w-full">
        <MarqueeBanner />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 px-4 py-6 md:py-12 gap-8 md:gap-16 max-w-7xl mx-auto w-full">

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center">
          <GroupQRCode groupId={groupId} />
          <p className="mt-4 text-center text-gray-300 text-sm md:text-base">
            Scan to join the <span className="font-semibold">{eventName}</span>
          </p>
        </div>

        {/* Chat Window Section */}
        <div className="flex-1 w-full max-w-3xl">
          <ChatWindow groupId={groupId} eventName={eventName} />
        </div>

      </div>
    </main>
  );
}
