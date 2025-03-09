import ComponentContainer from "@/components/component-container";
import ImagePreview from "@/components/image-preview";

interface ComponentShowcase {
  name: string,
  description: string,
  tags: string[],
  children: React.ReactNode,
}

const components: ComponentShowcase[] = [
  {
    name: "Image preview",
    description: "Interaction built using shared layout animations and Radix dialog primitive.",
    tags: ["radix", "motion", "tailwind"],
    children: <ImagePreview />,
  }
];

export default function Home() {
  return (
    <div className="mx-auto mt-16 px-4 md:px-0 max-w-[720px] text-[#181818] font-[family-name:var(--font-inter)]">
      {components.map((component) => (
        <ComponentContainer
          key={component.name}
          name={component.name}
          description={component.description}
          tags={component.tags}
        >
          {component.children}
        </ComponentContainer>
      ))}
    </div>
  );
}
