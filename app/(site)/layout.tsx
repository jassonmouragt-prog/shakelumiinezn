import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
    </>
  );
}