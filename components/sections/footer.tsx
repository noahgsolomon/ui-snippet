import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="z-50 mb-8 flex justify-between text-xs text-[#b3b3b3]">
      <div className="flex items-center gap-0.5">
        <div className="flex h-[18px] w-[18px] items-center">
          <svg
            className="cursor-pointer transition delay-200 duration-300 ease-in-out hover:scale-110 hover:rotate-10"
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.749159 4.42302C0.66252 2.76985 1.93359 1.35939 3.58817 1.27268L13.5745 0.74932C15.2291 0.662607 16.6406 1.93247 16.7272 3.58564L16.9894 8.58817L10.9976 8.90218C9.89457 8.95999 9.04719 9.9003 9.10495 11.0024L9.41798 16.9754L4.42483 17.2371C2.77025 17.3238 1.35871 16.054 1.27207 14.4008L0.749159 4.42302Z"
              fill="#d4d4d4"
            />
            <path
              d="M10.4173 16.9367L10.1297 11.449C10.0864 10.6224 10.7219 9.91715 11.5492 9.87379L17.0417 9.58595L10.4173 16.9367Z"
              fill="#d4d4d4"
            />
          </svg>
        </div>
        <span className="font-medium">snippet</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span>Built by</span>
        <a
          target="_blank"
          href="https://x.com/smintfy"
          className="hover:text-tertiary flex h-5 items-center gap-1 rounded-full bg-neutral-100 pr-1.5 pl-0.5 hover:bg-[#f0f0f0]"
        >
          <Image
            alt="smintfy profile picture"
            src="/profile.png"
            width={16}
            height={16}
            className="rounded-full outline-1 outline-black/5"
          />
          Smintfy
        </a>
      </div>
    </footer>
  );
}
