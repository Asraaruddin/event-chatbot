"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Send, Pencil, Trash2, Upload } from "lucide-react";

type AppUser = {
  id: string;
  name: string;
  group_id?: string;
  joined_at?: string;
};

type Announcement = {
  id?: string;
  title: string;
  message: string;
  created_at?: string;
};

export default function AdminDashboard() {
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "",
    message: "",
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users_app").select("*");
      if (!error && data) setAppUsers(data as AppUser[]);
    };
    fetchUsers();
  }, []);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Update client-side timestamp
  useEffect(() => {
    const updateTime = () => setLastUpdated(new Date().toLocaleString());
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // Announcement handlers
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.message.trim()) return alert("Please enter a message.");

    if (editingId) {
      await supabase.from("announcements").update(announcement).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("announcements").insert([announcement]);
    }

    setAnnouncement({ title: "", message: "" });
    fetchAnnouncements();
  };

  const handleEditAnnouncement = (a: Announcement) => {
    setEditingId(a.id || null);
    setAnnouncement({ title: a.title, message: a.message });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    fetchAnnouncements();
  };

  // File upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const text = await file.text();
      setFileContent(text);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Dashboard Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          🎛️ Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg rounded-2xl p-6 text-white hover:scale-105 transition transform">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">📱 App Users</h2>
            <p className="text-white/80 mb-3">People who scanned the QR & used the bot:</p>
            <div className="text-4xl md:text-5xl font-bold">{appUsers.length}</div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg rounded-2xl p-6 text-white hover:scale-105 transition transform">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">🕒 Last Update</h2>
            <p className="text-white/80 mb-3">Real-time engagement stats updated automatically.</p>
            {lastUpdated ? (
              <div className="text-lg md:text-xl font-medium">{lastUpdated}</div>
            ) : (
              <div className="text-white/60 text-sm">Loading...</div>
            )}
          </div>
        </div>

        {/* Announcement Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2">
            📢 Announcements
          </h2>

          {/* Announcement Form */}
          <form onSubmit={handleSaveAnnouncement} className="space-y-4">
            <input
              type="text"
              placeholder="Title (optional)"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
              placeholder="Type your message..."
              value={announcement.message}
              onChange={(e) =>
                setAnnouncement({ ...announcement, message: e.target.value })
              }
              className="border p-3 rounded-lg w-full h-28 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              <Send size={18} />
              {editingId ? "Update Announcement" : "Send Announcement"}
            </button>
          </form>

          {/* Announcement List */}
          <div className="mt-6 space-y-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{a.title || "Untitled"}</h3>
                  <p className="text-gray-600 mt-1">{a.message}</p>
                  <span className="text-sm text-gray-400">
                    {a.created_at ? new Date(a.created_at).toLocaleString() : ""}
                  </span>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEditAnnouncement(a)}
                    className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(a.id!)}
                    className="p-2 border border-red-400 text-red-500 rounded hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2">
            📄 Upload Event File
          </h2>
          <p className="text-gray-600 mb-4">
            Upload a text, CSV, or PDF file to feed data into the bot (e.g.
            schedule, speaker list, FAQs). The content will be extracted and stored in Supabase.
          </p>
          <input
            type="file"
            accept=".txt,.csv,.pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="border p-3 rounded-lg w-full md:w-auto mb-3"
          />
          <button
            disabled={uploading}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {fileContent && (
            <div className="mt-5 bg-gray-100 p-4 rounded-lg text-sm max-h-56 overflow-auto">
              <b>Extracted Content Preview:</b>
              <p className="mt-2 whitespace-pre-wrap text-gray-800">
                {fileContent.slice(0, 500)}...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
