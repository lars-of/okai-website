"use client";

import Image from "next/image";

/* ============================================
   TÜV-Störer – permanentes Element rechts

   Zeigt das TÜV-Siegel als seitliches Element
   auf allen Seiten. Hintergrundfarbe passend
   zum grauen Rand des TÜV-Siegels.
   ============================================ */

export function ReifegradStoerer() {
  return (
    <a
      href="/assets/CR_Lars Fieck.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2.5 bg-[#E8E8E8] pl-3 pr-2 py-2.5 okai-shape-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border border-[#D0D0D0]"
      title="TÜV-zertifizierter Manager für angewandte KI-Transformation"
      aria-label="TÜV-Zertifikat anzeigen"
    >
      <div className="text-right">
        <p className="text-[0.6rem] font-semibold leading-tight text-dark-gray">TÜV-zertifiziert</p>
        <p className="text-[0.5rem] text-mid-gray leading-tight">KI-Transformation</p>
      </div>
      <Image
        src="/assets/tuev-testmark.jpg"
        alt="TÜV-Testmark – Zertifizierter Manager für angewandte KI-Transformation"
        width={52}
        height={52}
        className="h-11 w-11 object-contain shrink-0"
      />
    </a>
  );
}
