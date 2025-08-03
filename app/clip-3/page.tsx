'use client';

import { TrashIcon } from 'lucide-react';

export default function ClipPathButton() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <button className="group relative flex h-10 cursor-pointer items-center gap-2 rounded-full bg-neutral-100 px-6 font-medium text-neutral-900 transition-transform duration-[160ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:scale-[0.97]">
        <TrashIcon size={16} />
        Hold to Delete
        <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-red-100 text-red-600 transition-[clip-path] duration-200 ease-out [clip-path:inset(0_100%_0_0)] group-active:transition-[clip-path] group-active:duration-[1500ms] group-active:ease-linear group-active:[clip-path:inset(0_0_0_0)]">
          <TrashIcon size={16} />
          Hold to Delete
        </div>
      </button>
    </div>
  );
}
