"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import itemsPerPageOptions from "@/constants/itemsPerPageOptions";

export default function Limit() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Get the current limit query from the URL
  const limit = searchParams.get("limit")?.toString();
  let defaultValue = "8";

  function handleLimit(limit: string) {
    const params = new URLSearchParams(searchParams);

    // Reset the current page to 1
    params.set("page", "1");

    // Add the limit value into the url
    params.set("limit", limit);
    replace(`${pathname}?${params.toString()}`);
  }

  // Sync the select current option with the URL param
  if (limit && itemsPerPageOptions.includes(limit)) {
    defaultValue = limit;
  }

  return (
    <div className="mt-1 mb-4">
      <label htmlFor="limit-choice">Pokémons per page:</label>
      <select
        className="bg-black color-white border border-gray-700 rounded px-1 ml-2"
        name="limit-choice"
        id="limit-choice"
        defaultValue={defaultValue}
        onChange={(e) => handleLimit(e.target.value)}
      >
        {itemsPerPageOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
