import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMIINE | Shakes Naturais & Nutrição de Alta Performance',
  description: 'Descubra a linha premium de shakes naturais LUMIINE. Nutrição botânica pura, blend proteico isolado, fava de baunilha bourbon e cacau nobre para sua rotina de bem-estar.',
  keywords: 'shakes naturais, nutrição premium, wellness, proteína vegetal, sem glúten, saúde, rotina saudável, revenda de shakes',
  openGraph: {
    title: 'LUMIINE | Natural Shakes • Gold Nutrition',
    description: 'Mais sabor, praticidade e equilíbrio para acompanhar sua rotina.',
    images: ['/images/shake-hero.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} ${cormorant.variable}`}>
      <body className="bg-[#FAFAF8] text-[#1A1A1A] font-sans antialiased min-h-screen flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#B8943D]">
        <AppProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          <main className="flex-1">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
