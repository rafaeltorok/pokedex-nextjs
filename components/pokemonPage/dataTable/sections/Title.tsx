"use client";

import Image from "next/image";
import { useState } from "react";

// Utils
import capitalize from "@/utils/capitalize";

interface TitleProps {
  id: number;
  name: string;
  spriteIcon: string;
}

export default function Title({ id, name, spriteIcon }: TitleProps) {
  const [isIconLoading, setIsIconLoading] = useState(true);

  return (
    <div
      className="
        flex
        items-center
        text-center font-bold
        [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]
        bg-black
        py-4 px-1
      "
    >
      {/* ID number */}
      <span className="w-2/8 text-xl">{`# ${String(id)}`}</span>

      {/* Pokémon name */}
      <span className="w-5/8 text-2xl">{capitalize(name)}</span>

      {/* Sprite icon */}
      <span className="w-1/8 w-[50px] h-[50px] relative">
        {isIconLoading && (
          // Display a placeholder skeleton while the icon is loading
          <div
            className="
              absolute
              animate-pulse
              w-[50px] h-[50px]
              gray-600 dark:bg-gray-900
              rounded-xl
            "
          />
        )}
        <Image
          src={spriteIcon}
          width={50}
          height={50}
          alt="Pokémon sprite icon"
          onLoad={() => setIsIconLoading(false)}
          className="absolute"
        />
      </span>
    </div>
  );
}
