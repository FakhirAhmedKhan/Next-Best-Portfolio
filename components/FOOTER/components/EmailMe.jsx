"use client";
import React from 'react'
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const EmailMe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return setStatus("error");
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [status]);
  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-lg border border-neutral-600 bg-neutral-900/80 px-4 py-4 text-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
        id="footer-email"
        name="footer-email"
      />

      {status === "success" && (
        <div className="flex items-center justify-center gap-2 py-4 text-lg font-medium text-green-400">
          <CheckCircle className="h-6 w-6" />
        </div>
      )}
    </form>)
}

