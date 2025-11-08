"use client";
import React from "react";

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3">
      <div className="flex animate-marquee whitespace-nowrap text-white font-semibold text-lg tracking-wide">
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
        <span className="mx-8">Talk. Explore. Engage. — Your Event Companion.</span>
      </div>
    </div>
  );
}
