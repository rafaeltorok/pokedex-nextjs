// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
interface AbilityRowProps {
  label: string;
  name: string;
  url: string;
  showDescription: (url: string) => void;
}

export default function AbilityRow({ label, name, url, showDescription }: AbilityRowProps) {
  return (
    <div className="flex w-full">
      <p
        className="
          w-1/2
          bg-gray-600
          p-2
          border-1 border-gray-500
        "
      >
        {label}
      </p>
      <button
        className="
          w-1/2
          bg-gray-800 hover:bg-gray-600 active:bg-gray-300
          p-2
          text-center
          border-1 border-gray-500
        "
        onClick={() => showDescription(url)}
      >
        {capitalize(name)}
      </button>
    </div>
  );
}
