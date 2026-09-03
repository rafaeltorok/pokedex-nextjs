"use client";

import { useState } from "react";
import Image from "next/image";

export default function SpritePicture({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-[300px] h-[300px]">
      {loading && (
        <p className="absolute inset-0 flex items-center justify-center bg-gray-900">
          Loading sprite...
        </p>
      )}

      <Image
        src={url}
        width={300}
        height={300}
        alt="Pokémon picture"
        className="p-5"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
