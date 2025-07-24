'use client';

import Showcase from '@/components/sections/showcase';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div
      className={cn(
        'relative mx-auto flex max-w-[720px] flex-col px-4 font-[family-name:var(--font-inter)] md:px-0',
      )}
    >
      <Toaster duration={6000} />
      <Header />

      {/* Example 1: Decorative quotes */}
      <blockquote className="relative my-8 px-8 text-lg italic before:absolute before:top-0 before:left-0 before:text-5xl before:text-gray-300 before:content-['\\201C'] after:absolute after:right-0 after:bottom-0 after:text-5xl after:text-gray-300 after:content-['\\201D']">
        Building beautiful UIs with modern tools
      </blockquote>

      {/* Example 2: Section separator with dots */}
      <div className="my-8 flex items-center before:flex-1 before:border-b before:border-gray-300 before:content-[''] after:flex-1 after:border-b after:border-gray-300 after:content-['']">
        <span className="px-4 text-sm text-gray-500">Components</span>
      </div>

      {/* Example 3: Badge with "NEW" indicator */}
      <div className="my-4 inline-block">
        <button className="relative rounded bg-blue-500 px-4 py-2 text-white after:absolute after:-top-2 after:-right-2 after:rounded-full after:bg-red-500 after:px-2 after:py-0.5 after:text-xs after:text-white after:content-['NEW'] hover:bg-blue-600">
          Try Premium Features
        </button>
      </div>

      {/* Example 4: Status indicators */}
      <div className="my-8 space-y-2">
        <div className="flex items-center before:mr-2 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:content-['']">
          Online
        </div>
        <div className="flex items-center before:mr-2 before:h-2 before:w-2 before:rounded-full before:bg-yellow-500 before:content-['']">
          Away
        </div>
        <div className="flex items-center before:mr-2 before:h-2 before:w-2 before:rounded-full before:bg-red-500 before:content-['']">
          Offline
        </div>
      </div>

      {/* Example 5: Breadcrumb separators */}
      <nav className="my-4">
        <ul className="flex items-center space-x-2">
          <li className="after:ml-2 after:text-gray-400 after:content-['/']">Home</li>
          <li className="after:ml-2 after:text-gray-400 after:content-['/']">Products</li>
          <li>Details</li>
        </ul>
      </nav>

      {/* Example 6: Tooltips */}
      <div className="my-8">
        <button className="relative rounded bg-gray-200 px-4 py-2 before:absolute before:bottom-full before:left-1/2 before:mb-2 before:-translate-x-1/2 before:rounded before:bg-gray-800 before:px-3 before:py-1 before:text-sm before:whitespace-nowrap before:text-white before:opacity-0 before:transition-opacity before:content-['Click_me_for_magic!'] after:absolute after:bottom-full after:left-1/2 after:mb-1 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800 after:opacity-0 after:transition-opacity after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
          Hover for tooltip
        </button>
      </div>

      <Showcase />

      {/* Example 7: Decorative line with text */}
      <div className="relative my-8 text-center before:absolute before:top-1/2 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent before:content-['']">
        <span className="relative bg-white px-4 text-sm text-gray-500">End of examples</span>
      </div>

      <Footer />
    </div>
  );
}
