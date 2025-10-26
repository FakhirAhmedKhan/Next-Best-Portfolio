"use client";
import HeaderSection from "@/app/header/Navbar";

export const dynamic = "force-dynamic"; // optional, prevents prerender crash

export default function HeaderPage() {
  return <HeaderSection />;
}