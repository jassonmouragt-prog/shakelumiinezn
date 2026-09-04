import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Executivo | SHAKE LUMIINE ZN',
  description: 'Gestão executiva, controle financeiro, estoque, catálogo e pedidos.'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#EDEDED] antialiased selection:bg-[#D4AF37] selection:text-black">
      {children}
    </div>
  );
}