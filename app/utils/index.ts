import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberCompact = (number: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short"
  });

  return formatter.format(number);
};
