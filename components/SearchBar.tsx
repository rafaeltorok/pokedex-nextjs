"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Add the search term to the url
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="mx-auto">
      <input
        className="bg-gray-700 p-2 my-4 rounded w-[275px]"
        type="search"
        placeholder="Search Pokémon..."
        onChange={(e) => {
          handleSearch(e.target.value.trimStart());
        }}
      />
    </div>
  );
}
