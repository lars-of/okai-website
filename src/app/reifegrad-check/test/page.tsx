import type { Metadata } from "next";
import Link from "next/link";
import { ReifegradQuiz } from "@/components/ReifegradQuiz";

export const metadata: Metadata = {
  title: "KI-Reifegrad-Check – Jetzt starten | OKAI",
  description:
    "25 Fragen. 5 Minuten. Finde heraus, wo dein Unternehmen bei KI wirklich steht. Kostenlos, ohne Login, mit Sofortergebnis.",
};

export default function ReifegradTestPage() {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">
            okai.de
          </Link>
          <span className="mx-2">›</span>
          <Link href="/reifegrad-check" className="hover:text-black">
            KI-Reifegrad-Check
          </Link>
          <span className="mx-2">›</span>
          <span>Check starten</span>
        </nav>

        {/* Quiz-Komponente */}
        <ReifegradQuiz />
      </div>
    </div>
  );
}
