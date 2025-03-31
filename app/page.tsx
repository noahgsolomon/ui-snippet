import Showcase from '@/components/sections/showcase';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div className="mx-auto mt-16 max-w-[720px] px-4 font-[family-name:var(--font-inter)] text-[#181818] md:px-0">
      <Toaster duration={6000} />
      <Header />
      <Showcase />
      <Footer />
    </div>
  );
}
