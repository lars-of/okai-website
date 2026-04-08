"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IconArrowRight, IconMenu, IconClose } from "./Icons";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /* Scroll-Erkennung: Nav wird nach 50px Scrollen sichtbar */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialwert setzen
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo – weiße Version auf dunklem Hintergrund */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/okai-logo.png"
              alt="OKAI"
              width={100}
              height={32}
              className="h-8 w-auto invert brightness-200"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/mastery-roadmap" className="text-sm font-medium text-sand-border hover:text-white transition-colors">
              Leistungen
            </Link>
            <Link href="/reifegrad-check" className="text-sm font-medium text-sand-border hover:text-white transition-colors">
              Reifegrad-Check
            </Link>
            <Link href="/werte" className="text-sm font-medium text-sand-border hover:text-white transition-colors">
              Werte
            </Link>
            <Link href="/ueber-lars" className="text-sm font-medium text-sand-border hover:text-white transition-colors">
              Über Lars
            </Link>
            <Link
              href="/reifegrad-check"
              className="inline-flex items-center gap-2 bg-bright-red text-white text-sm font-semibold px-5 py-2.5 okai-shape-sm hover:opacity-90 transition-opacity"
            >
              Check starten
              <IconArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm px-4 py-4 space-y-3">
          <Link href="/mastery-roadmap" className="block text-sm font-medium text-sand-border py-2" onClick={() => setMobileOpen(false)}>
            Leistungen
          </Link>
          <Link href="/reifegrad-check" className="block text-sm font-medium text-sand-border py-2" onClick={() => setMobileOpen(false)}>
            Reifegrad-Check
          </Link>
          <Link href="/werte" className="block text-sm font-medium text-sand-border py-2" onClick={() => setMobileOpen(false)}>
            Werte
          </Link>
          <Link href="/ueber-lars" className="block text-sm font-medium text-sand-border py-2" onClick={() => setMobileOpen(false)}>
            Über Lars
          </Link>
          <Link
            href="/reifegrad-check"
            className="inline-flex items-center gap-2 bg-bright-red text-white text-sm font-semibold px-5 py-2.5 okai-shape-sm w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Check starten
            <IconArrowRight size={16} />
          </Link>
        </div>
      )}
    </nav>
  );
}
