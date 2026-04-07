import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über Lars – OKAI",
  description: "Lars Fiëck – Strategy Director & AI Consultant bei OKAI.",
};

export default function UeberLarsPage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <span>Über Lars</span>
        </nav>

        <h1 className="mb-8">Über Lars</h1>

        <div className="bg-off-white rounded-2xl p-12 text-center border border-sand-border">
          <p className="text-mid-gray">Diese Seite wird in der nächsten Phase ausgebaut.</p>
        </div>
      </div>
    </div>
  );
}
