// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
interface AbilityRowProps {
  label: string;
  name: string;
  setShowMessage: (show: boolean) => void;
  setMessage: (message: string) => void;
  description: string;
}

export default function AbilityRow({ label, name, setShowMessage, setMessage, description }: AbilityRowProps) {
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
        onClick={() => {
          setMessage(description || "No description available");
          setShowMessage(true);
        }}
      >
        {capitalize(name)}
      </button>
    </div>
  );
}
