import { SelectItem } from "@/types/formSelect";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

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

export const formatSlug = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatSelectOptions = (options: string[]): SelectItem[] => {
  // console.log(options);

  let data = options.map((it) => ({ label: it, value: it }));

  return data;
};

export const revertSelectOptions = (options: SelectItem[]): string[] => {
  let data = options.map((it) => it.value);

  return data;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const stringToArray = (str: string) => {
  return str.split(",");
};

export const getFormattedMonthFromIndex = (monthIndex: number): string => {
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("Invalid month index. Must be between 0 and 11.");
  }

  // Format the month with leading zero if necessary
  const month = monthIndex + 1;
  return month < 10 ? `0${month}` : `${month}`;
};

export const getFormattedDayFromIndex = (dayIndex: number): string => {
  if (dayIndex < 0 || dayIndex > 31) {
    throw new Error("Invalid day index. Must be between 0 and 30.");
  }

  // Format the day with leading zero if necessary
  const day = dayIndex;
  return day < 10 ? `0${day}` : `${day}`;
};

export const handleTableDownload = (tableData: any[]) => {
  console.log(tableData, "from util func");

  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(tableData);

  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "table_data.xlsx");
};

export const calculateTimeLeft = (timestamp: string): string => {
  const now = new Date();
  const targetDate = new Date(timestamp);
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return "Time's up!";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days} days left`;
  } else if (hours > 0) {
    return `${hours} hours left`;
  } else if (minutes > 0) {
    return `${minutes} minutes left`;
  } else {
    return `${seconds} seconds left`;
  }
};

export const getBrowserAndOS = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let osName = "Unknown";

  // Detect browser
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  } else if (
    userAgent.indexOf("MSIE") > -1 ||
    userAgent.indexOf("Trident") > -1
  ) {
    browserName = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
  }

  // Detect OS
  if (userAgent.indexOf("Win") > -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") > -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("Linux") > -1) {
    osName = "Linux";
  } else if (userAgent.indexOf("Android") > -1) {
    osName = "Android";
  } else if (userAgent.indexOf("like Mac") > -1) {
    osName = "iOS";
  }

  return { browser: browserName, os: osName };
};
