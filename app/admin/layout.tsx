import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0C0A]">
      <header className="sticky top-0 z-40 bg-[#0D0C0A]/95 backdrop-blur border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A227] to-[#B8943D] flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="SHAKELUMIINEZN"
              width={36}
              height={36}
              unoptimized
              className="object-contain h-full w-full p-1"
            />
          </div>
          <div>
            <span className="block text-sm font-bold tracking-wide text-white leading-tight">
              PAINEL ADMINISTRATIVO
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold leading-tight">
              SHAKELUMIINEZN
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="text-[11px] font-semibold text-white/50 hover:text-white transition-colors"
        >
          Ver loja →
        </Link>
      </header>
      <div className="px-4 sm:px-8 py-8">{children}</div>
    </div>
  );
}