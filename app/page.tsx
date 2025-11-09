import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";
import GroupQRCode from "@/components/GroupQRCode";

export default function Home() {
  const groupId = "hackathon2025";
  const eventName = "Boomi Hackathon 2025";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <MarqueeBanner />
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <GroupQRCode groupId={groupId} />
        {/* ✅ Pass both props here */}
        <ChatWindow groupId={groupId} eventName={eventName} />
      </div>
    </main>
  );
}
