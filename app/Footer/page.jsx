"use client";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
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
    <footer
      id="contact"
      className="flex flex-col min-h-screen items-center justify-center px-4 text-center space-y-6"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500  bg-clip-text text-transparent mb-4">
          Get In Touch
        </h2>
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
      </form>

      <p className="mx-auto max-w-2xl text-lg text-neutral-700 md:text-xl dark:text-neutral-400">
        Built with 💖 using React & Tailwind CSS.
      </p>
    </footer>
  );
}