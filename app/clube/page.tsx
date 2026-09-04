'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClubRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#8E8E8A]">Redirecionando para a loja...</p>
      </div>
    </div>
  );
}
