'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RoleSwitcher() {
  const { currentRole, setCurrentRole, loyalty } = useApp();
  const pathname = usePathname();
  const isClube = pathname.startsWith('/clube');

  const roles: { role: UserRole; label: string; icon: React.ElementType; badge: string; link: string }[] = [
    {
      role: 'customer',
      label: 'Visitante / Loja',
      icon: User,
      badge: 'Público',
      link: '/'
    },
    {
      role: 'customer', // As logged in club member
      label: 'Membro Clube',
      icon: Sparkles,
      badge: `${loyalty.tier} • ${loyalty.points} pts`,
      link: '/clube'
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-full border border-[#D4AF37]/40 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.12)] flex items-center gap-1">
      <div className="hidden md:flex items-center pl-3 pr-2 text-[10px] font-bold text-[#8E8E8A] tracking-wider uppercase border-r border-[#E8E8E4]">
        Simular Perfil:
      </div>

      <div className="flex items-center gap-1">
        {roles.map((item, idx) => {
          const Icon = item.icon;
          const isSelected =
            (idx === 0 && currentRole === 'customer' && !isClube) ||
            (idx === 1 && isClube);

          return (
            <Link
              key={idx}
              href={item.link}
              onClick={() => setCurrentRole(item.role)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white shadow-xs'
                  : 'text-[#5A5A58] hover:text-[#1A1A1A] hover:bg-[#F5F5F3]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EFEFEA] text-[#5A5A58]'
                }`}
              >
                {item.badge}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
