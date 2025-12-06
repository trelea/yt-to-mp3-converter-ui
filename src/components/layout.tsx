import { Outlet } from "react-router";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Animated ambient gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base background */}
        <div className="absolute inset-0 bg-background" />

        {/* Primary gradient orb - top left purple */}
        <div className="absolute -top-[100px] -left-[100px] h-[350px] w-[350px] rounded-full bg-violet-800 opacity-[0.04] blur-[80px] animate-[drift_20s_ease-in-out_infinite]" />

        {/* Secondary gradient orb - bottom right pink */}
        <div className="absolute -bottom-[100px] -right-[100px] h-[300px] w-[300px] rounded-full bg-fuchsia-800 opacity-[0.04] blur-[80px] animate-[drift_25s_ease-in-out_infinite_reverse]" />

        {/* Center gradient orb - blue/cyan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue-800 opacity-[0.03] blur-[80px] animate-[drift_18s_ease-in-out_infinite]" />

        {/* Top right accent orb */}
        <div className="absolute top-[10%] right-[10%] h-[250px] w-[250px] rounded-full bg-purple-700 opacity-[0.03] blur-[60px] animate-[drift_22s_ease-in-out_infinite_reverse]" />
      </div>

      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
