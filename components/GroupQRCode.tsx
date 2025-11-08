"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface GroupQRCodeProps {
  groupId: string;
}

export default function GroupQRCode({ groupId }: GroupQRCodeProps) {
  const chatUrl = ` https://event-chatbot-rho.vercel.app/chat?group=${groupId}`; 
 


  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-white font-semibold">Join the Boomi-AI Group</h3>
      <QRCodeCanvas value={chatUrl} size={180} />
      <p className="text-gray-400 text-sm mt-2">Scan to join this group chat!</p>
    </div>
  );
}
