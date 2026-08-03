import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extracts the object key from a minio  URL
export function extractObjectKey(url: string): string {
  const { pathname } = new URL(url);
  const parts = pathname.split("/").filter(Boolean);
  return parts.slice(1).join("/");
}
