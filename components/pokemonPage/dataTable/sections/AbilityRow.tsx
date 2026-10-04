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

export default function AbilityRow({
  label,
  name,
  setShowMessage,
  setMessage,
  description,
}: AbilityRowProps) {
  return (
    <div className="flex w-full">
      <label
        htmlFor={label}
        className="
          w-1/2
          bg-gray-600
          p-2
          border-1 border-gray-500
          bg-gray-500 hover:bg-gray-400 active:bg-gray-300
        "
      >
        {label}
      </label>
      <button
        id={label}
        className="
          w-1/2
          p-2
          text-center
          border-1 border-gray-500
          bg-gray-800 hover:bg-gray-400 active:bg-gray-300
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
