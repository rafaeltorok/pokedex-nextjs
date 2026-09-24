"use client";

import Link from "next/link";

interface NavArrowsProps {
  previous: string;
  next: string;
  regionName: string;
}

export default function NavArrows({
  previous,
  next,
  regionName,
}: NavArrowsProps) {
  return (
    <div>
      {/* Previous arrow */}
      {previous && (
        <div
          className="
            absolute
            -left-9
            text-4xl
            p-1
            border-1 border-gray-700 rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
          "
        >
          <Link href={`/${regionName}/${previous}`}>◀</Link>
        </div>
      )}

      {/* Next arrow */}
      {next && (
        <div
          className="
            absolute
            -right-9
            text-4xl
            p-1
            border-1 border-gray-700 rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
          "
        >
          <Link href={`/${regionName}/${next}`}>▶</Link>
        </div>
      )}
    </div>
  );
}
