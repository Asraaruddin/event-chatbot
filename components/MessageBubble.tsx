import React from "react";
import clsx from "clsx";

interface Props {
  sender: "bot" | "user";
  text: string;
}

export default function MessageBubble({ sender, text }: Props) {
  return (
    <div
      className={clsx("flex w-full", {
        "justify-end": sender === "user",
        "justify-start": sender === "bot",
      })}
    >
      <div
        className={clsx(
          "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
          sender === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-800 text-gray-100 rounded-bl-none"
        )}
      >
        {text}
      </div>
    </div>
  );
}
