interface ComponentContainerProps {
  name: string;
  description: React.JSX.Element;
  tags: string[];
  source: string;
  children: React.ReactNode;
}

export default function ComponentContainer({
  name,
  description,
  tags,
  source,
  children,
}: ComponentContainerProps) {
  return (
    <div className="flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-medium">{name}</h2>
        <p className="text-[#737373]">
          {description}{' '}
          <a className="underline" target="_blank" href={`${source}`}>
            View source
          </a>
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center rounded-2xl border-[0.5px] border-black/10 px-6 py-16 md:px-0">
        {children}
      </div>
      <div className="mt-4 flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex h-[20px] items-center rounded-full border border-black/10 px-[6px] text-xs text-[#535353]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
