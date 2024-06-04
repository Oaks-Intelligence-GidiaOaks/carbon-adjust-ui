import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (createdDate: string) => {
  const date = new Date(createdDate);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Africa/Lagos",
  };

  return date.toLocaleDateString("en-US", options as any);
};

// textHelpers.js

// Helper function to truncate text and add ellipsis
export const truncateWithEllipsis = (text: string, maxLength: number) => {
  const stringValue = text.toString();
  if (stringValue.length > maxLength) {
    return stringValue.slice(0, maxLength) + "...";
  }
  return stringValue;
};
