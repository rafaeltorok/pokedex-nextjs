import clsx from "clsx";
import Link from "next/link";

export default function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border border-gray-500",
    {
      "pointer-events-none text-gray-500": isDisabled,
      "hover:bg-gray-700": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  // Define a custom icon for the arrow buttons
  const icon = direction === "left" ? <div>◄</div> : <div>►</div>;

  // Add a different style when the button is disabled
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
