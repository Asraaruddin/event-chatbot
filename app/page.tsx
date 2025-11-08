import ChatWindow from "@/components/ChatWindow";
import MarqueeBanner from "@/components/MarqueeBanner";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <MarqueeBanner />
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <ChatWindow />
      </div>
    </main>
  );
}
