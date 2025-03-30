import ComponentContainer from '@/components/component-container';
import FamilyStyleOTP from '@/components/family-style-otp';
import ImagePreview from '@/components/image-preview';
import MultiStep from '@/components/multi-step';
import Image from 'next/image';

interface ComponentContainerProps {
  name: string;
  description: React.JSX.Element;
  tags: string[];
  source: string;
  children: React.ReactNode;
}

const components: ComponentContainerProps[] = [
  {
    name: 'Image preview',
    description: <>Interaction built using shared layout animations and Radix dialog primitive.</>,
    tags: ['react', 'radix', 'motion', 'tailwind'],
    source: 'https://github.com/Smintfy/ui-snippet/blob/main/components/image-preview.tsx',
    children: <ImagePreview />,
  },
  {
    name: 'Multi-step flow',
    description: (
      <>This is a multi-step component guiding users through a process or for an onboarding.</>
    ),
    tags: ['react', 'motion', 'tailwind'],
    source: 'https://github.com/Smintfy/ui-snippet/blob/main/components/multi-step.tsx',
    children: <MultiStep />,
  },
  {
    name: 'Family style OTP',
    description: (
      <>
        Recreating OTP component from&nbsp;
        <a
          href="https://x.com/benjitaylor/status/1900685689400029562"
          target="_blank"
          className="underline"
        >
          Family
        </a>
        &nbsp;built on top of&nbsp;
        <a href="https://input-otp.rodz.dev" target="_blank" className="underline">
          otp-input
        </a>
        &nbsp;by guilhermerodz.
      </>
    ),
    tags: ['react', 'motion'],
    source: 'https://github.com/Smintfy/ui-snippet/blob/main/components/family-style-otp.tsx',
    children: <FamilyStyleOTP />,
  },
];

export default function Home() {
  return (
    <div className="mx-auto mt-16 max-w-[720px] px-4 font-[family-name:var(--font-inter)] text-[#181818] md:px-0">
      <div className="mb-32 flex flex-col gap-24">
        {components.map((component) => (
          <ComponentContainer
            key={component.name}
            name={component.name}
            description={component.description}
            tags={component.tags}
            source={component.source}
          >
            {component.children}
          </ComponentContainer>
        ))}
      </div>
      <footer className="mb-8 flex justify-between text-xs text-[#b3b3b3]">
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
            className="flex h-5 items-center gap-1 rounded-full bg-[#f5f5f5] pr-1.5 pl-0.5 hover:bg-[#f0f0f0] hover:text-[#737373]"
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
    </div>
  );
}
