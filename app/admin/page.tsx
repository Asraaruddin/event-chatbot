"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AppUser = {
  id: string;
  name: string;
  group_id?: string;
  joined_at?: string;
};

type Announcement = {
  title: string;
  message: string;
};

export default function AdminDashboard() {
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "",
    message: "",
  });
  const [fileContent, setFileContent] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(""); // ✅ client-safe timestamp

  // ✅ Fetch users_app (QR scanned users)
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users_app").select("*");
      if (!error && data) setAppUsers(data as AppUser[]);
    };
    fetchUsers();
  }, []);

  // ✅ Set client-side time (avoids hydration mismatch)
  useEffect(() => {
    const updateTime = () => setLastUpdated(new Date().toLocaleString());
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60); // updates every 1 min
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle announcement send
  const sendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.message.trim()) return alert("Please enter a message.");
    const { error } = await supabase.from("announcements").insert([announcement]);
    if (error) alert("Failed to send announcement ❌");
    else {
      alert("Announcement sent! 📢");
      setAnnouncement({ title: "", message: "" });
    }
  };

  // ✅ Handle file upload and extract text
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const text = await file.text();
      setFileContent(text);

      // Store extracted content in Supabase for bot context
      const { error } = await supabase.from("event_files").insert([
        {
          file_name: file.name,
          file_content: text,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to upload file ❌");
      } else {
        alert("File uploaded & extracted successfully! ✅");
      }
    } catch (err) {
      console.error(err);
      alert("Error reading file ❌");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🎛️ Admin Dashboard
        </h1>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="font-semibold text-xl mb-2">📱 App Users</h2>
            <p className="text-gray-600 mb-3">
              People who scanned the QR & used the bot:
            </p>
            <div className="text-4xl font-bold text-blue-600">
              {appUsers.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="font-semibold text-xl mb-2">🕒 Last Update</h2>
            <p className="text-gray-600 mb-3">
              Real-time engagement stats updated automatically.
            </p>
            {/* ✅ Render only after hydration */}
            {lastUpdated ? (
              <div className="text-lg font-medium text-green-600">
                {lastUpdated}
              </div>
            ) : (
              <div className="text-gray-400 text-sm">Loading...</div>
            )}
          </div>
        </div>

        {/* Announcement Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-xl mb-4">📢 Send Announcement</h2>
          <form onSubmit={sendAnnouncement} className="space-y-3">
            <input
              type="text"
              placeholder="Title (optional)"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Type your message..."
              value={announcement.message}
              onChange={(e) =>
                setAnnouncement({ ...announcement, message: e.target.value })
              }
              className="border p-2 rounded w-full h-24 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Announcement
            </button>
          </form>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-xl mb-4">📄 Upload Event File</h2>
          <p className="text-gray-600 mb-3">
            Upload a text, CSV, or PDF file to feed data into the bot (e.g.
            schedule, speaker list, FAQs). The content will be extracted and
            stored in Supabase for chatbot use.
          </p>
          <input
            type="file"
            accept=".txt,.csv,.pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="border p-2 rounded w-full"
          />
          {uploading && (
            <p className="text-blue-500 mt-2">Uploading and extracting...</p>
          )}
          {fileContent && (
            <div className="mt-3 bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
              <b>Extracted Content Preview:</b>
              <p className="whitespace-pre-wrap mt-1 text-gray-700">
                {fileContent.slice(0, 500)}...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
