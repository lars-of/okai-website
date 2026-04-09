"use client";

import Image from "next/image";

/* ============================================
   TÜV-Störer – permanentes Element rechts

   Zeigt das TÜV-Siegel als seitliches Element
   auf allen Seiten. Hintergrundfarbe passend
   zum grauen Rand des TÜV-Siegels.
   Text steht unter dem Siegel.
   ============================================ */

export function ReifegradStoerer() {
  return (
    <a
      href="/assets/CR_Lars Fieck.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center bg-[#E8E8E8] px-3 pt-3 pb-2 okai-shape-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border border-[#D0D0D0]"
      title="TÜV-zertifizierter Manager für angewandte KI-Transformation"
      aria-label="TÜV-Zertifikat anzeigen"
    >
      {/* TÜV-Siegel – 2.5x grösser (von 44px auf 110px) */}
      <Image
        src="/assets/tuev-testmark.jpg"
        alt="TÜV-Testmark – Zertifizierter Manager für angewandte KI-Transformation"
        width={130}
        height={130}
        className="h-[110px] w-[110px] object-contain shrink-0"
      />
      {/* Text unter dem Siegel */}
      <p className="text-[0.65rem] font-semibold leading-tight text-dark-gray mt-2 text-center">
        TÜV-zertifiziert
      </p>
    </a>
  );
}
