import capitalize from "@/utils/capitalize";

interface TitleProps {
  id: number;
  name: string;
}

export default function Title({ id, name }: TitleProps) {
  return (
    <div
      className="
        flex
        items-center
        text-center font-bold
        [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]
        bg-black
        py-4
        rounded-tl-xl rounded-tr-xl
      "
    >
      <span className="w-2/8 text-xl">{`# ${String(id)}`}</span>
      <span className="w-6/8 text-2xl">{capitalize(name)}</span>
    </div>
  );
}
