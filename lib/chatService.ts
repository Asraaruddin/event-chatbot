import { supabase } from "@/lib/supabaseClient";

export async function sendMessage(groupId: string, sender: string, text: string) {
  await supabase.from("messages").insert([{ group_id: groupId, sender, text }]);
}

export function subscribeToMessages(groupId: string, callback: (message: any) => void) {
  return supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: `group_id=eq.${groupId}` },
      (payload) => callback(payload.new)
    )
    .subscribe();
}
