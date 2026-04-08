"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowRight } from "./Icons";

export function ReifegradStoerer() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Nach 1.5s sanft einblenden */
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* Auf der Reifegrad-Check-Seite ausblenden */
  if (pathname?.startsWith("/reifegrad-check")) return null;

  return (
    <Link
      href="/reifegrad-check"
      className={`fixed right-0 bottom-24 z-40 flex items-center gap-3 bg-bright-red text-white pl-5 pr-4 py-3.5 okai-shape-lg shadow-xl hover:scale-105 transition-all duration-500 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ transitionProperty: "transform, opacity, scale" }}
    >
      <div>
        <p className="text-sm font-bold leading-tight">KI-Reifegrad-Check</p>
        <p className="text-[0.7rem] font-medium opacity-90">5 Min. · Kostenlos</p>
      </div>
      <IconArrowRight size={18} className="shrink-0" />
    </Link>
  );
}
