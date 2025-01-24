"use client";

import { useEffect } from "react";
import { SettingsDialog } from "@/components/settings-dialog";

export default function Page() {
  useEffect(() => {
    document.body.classList.add("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  return (
    <div className="flex h-svh items-center justify-center">
      <SettingsDialog />
    </div>
  );
}