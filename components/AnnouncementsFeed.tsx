'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AnnouncementsFeed() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Fetch existing announcements
    supabase.from('announcements').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setMessages(data || []);
    });

    // Subscribe to real-time inserts
    const channel = supabase
      .channel('public:announcements')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'announcements' },
        (payload) => {
          setMessages((prev) => [payload.new, ...prev]); // prepend new one
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!messages.length) return null;

  return (
    <div className="w-full bg-gray-900 text-white py-2 px-4 border-t border-gray-700">
      {messages.map((m) => (
        <div key={m.id} className="p-2 border-b border-gray-800">
          <strong className="text-yellow-400">{m.title}</strong>: {m.message}
        </div>
      ))}
    </div>
  );
}
