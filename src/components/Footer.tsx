import Link from "next/link";
import Image from "next/image";
import { IconLinkedIn } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-black text-off-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo – weiße Version */}
        <div className="mb-10">
          <Link href="/">
            <Image
              src="/assets/okai-logo.png"
              alt="OKAI"
              width={100}
              height={32}
              className="h-8 w-auto invert brightness-200"
            />
          </Link>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Leistungen */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-mid-gray uppercase tracking-wider">Leistungen</h4>
            <ul className="space-y-2.5">
              <li><Link href="/mastery-roadmap#durchblick" className="text-sm text-sand-border hover:text-off-white transition-colors">KI Durchblick</Link></li>
              <li><Link href="/mastery-roadmap#roadmap" className="text-sm text-sand-border hover:text-off-white transition-colors">KI Roadmap</Link></li>
              <li><Link href="/mastery-roadmap#loesung" className="text-sm text-sand-border hover:text-off-white transition-colors">KI Lösung</Link></li>
              <li><Link href="/mastery-roadmap#autopilot" className="text-sm text-sand-border hover:text-off-white transition-colors">KI Autopilot</Link></li>
            </ul>
          </div>

          {/* Über OKAI */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-mid-gray uppercase tracking-wider">Über OKAI</h4>
            <ul className="space-y-2.5">
              <li><Link href="/ueber-lars" className="text-sm text-sand-border hover:text-off-white transition-colors">Über Lars</Link></li>
              <li><Link href="/werte" className="text-sm text-sand-border hover:text-off-white transition-colors">Werte & KI-Policy</Link></li>
              <li><Link href="/reifegrad-check" className="text-sm text-sand-border hover:text-off-white transition-colors">Reifegrad-Check</Link></li>
              <li><Link href="/mastery-roadmap" className="text-sm text-sand-border hover:text-off-white transition-colors">OKAI Mastery Roadmap</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-mid-gray uppercase tracking-wider">Rechtliches</h4>
            <ul className="space-y-2.5">
              <li><Link href="/datenschutz" className="text-sm text-sand-border hover:text-off-white transition-colors">Datenschutz</Link></li>
              <li><Link href="/impressum" className="text-sm text-sand-border hover:text-off-white transition-colors">Impressum</Link></li>
            </ul>
          </div>
        </div>

        {/* LinkedIn + Copyright */}
        <div className="border-t border-dark-gray pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://www.linkedin.com/in/lars-fieck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-sand-border hover:text-off-white transition-colors"
          >
            <IconLinkedIn size={16} />
            linkedin.com/in/lars-fieck
          </a>
          <p className="text-sm text-mid-gray">
            &copy; 2026 OKAI &middot; Lars Fiëck &middot; Hamburg
          </p>
        </div>
      </div>
    </footer>
  );
}
