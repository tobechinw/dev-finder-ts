"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

// export function splitTags(tags: string) {
//   return tags.split(",").map((tag) => tag.trim());
// }

export function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          className={cn(badgeVariants())}
          key={tag}
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
