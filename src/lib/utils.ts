import { IDevice, IDeviceChartData } from "@/interfaces/device.interface";
import { UserRole } from "@/interfaces/user.interface";
import Joi from "joi";
import { SelectItem } from "@/types/formSelect";
import { IComponentMap } from "@/types/general";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { ITransport } from "@/interfaces/transport.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//

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

export const formatTimeToISO = (input: string): string => {
  // Check if the input is in ISO format (starting with 'T')
  if (input.includes("T")) {
    // Parse the time from the ISO string (format: 'YYYY-MM-DDTHH:MM:SSZ')
    const date = new Date(input);

    // Extract hours and minutes
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    // Return the time in 'HH:MM' format
    return `${hours}:${minutes}`;
  } else {
    // If input is in 'HH:MM' format, convert to ISO
    // Get the current date
    const currentDate = new Date();

    // Extract hours and minutes from the time string
    const [hours, minutes] = input.split(":").map(Number);

    // Set hours and minutes in the current date
    currentDate.setUTCHours(hours, minutes, 0, 0);

    // Return the date in the ISO 8601 format
    return currentDate.toISOString();
  }
};

export function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);

  const formattedDate = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const formattedTime = date.toISOString().slice(11, 16); // "HH:MM"

  return `${formattedDate} ${formattedTime}`;
}

// Usage
const timestamp = "2024-10-29 22:56:00+01:00";
console.log(formatDateTime(timestamp)); // Output: "2024-10-29 22:56"

export function convertNumberToTimeFormat(hours: any) {
  // Ensure hours is a two-digit string
  const formattedHours = String(hours).padStart(2, "0");

  // Return the formatted time
  return `${formattedHours}:00:00`;
}

export const formDateWithTime = (
  createdDate: string,
  onlyTime: boolean = false
) => {
  const date = new Date(createdDate);

  const option = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric", // Optional, if you want to display seconds
    timeZone: "Africa/Lagos",
    hour12: true, // Optional, to display 12-hour format with AM/PM. Use `false` for 24-hour format.
  };

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric", // Optional, if you want to display seconds
    timeZone: "Africa/Lagos",
    hour12: true, // Optional, to display 12-hour format with AM/PM. Use `false` for 24-hour format.
  };

  return onlyTime
    ? date.toLocaleTimeString("en-US", option as any)
    : date.toLocaleDateString("en-US", options as any);
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

// device
export const validateDeviceInputs = (formData: IDevice) => {
  let error: string | null = null;

  switch (true) {
    case Boolean(formData.name.length) === false:
      error = "Name must not be empty";
      break;
    // @ts-ignore
    case Boolean(formData.type?.value.length) === false:
      error = "Type must have a value";
      break;
    case Boolean(formData.serialNos.length) === false:
      error = "serial number must have a value";
      break;
    case Boolean(formData.powerRating.length) === false:
      error = "Power rating must have a value";
      break;
    case Boolean(formData.voltageLevel.length) === false:
      error = "Voltage Level must have a value";
      break;
    // @ts-ignore
    case Boolean(formData.energySource?.value.length) === false:
      error = "Energy source must have a value";
      break;
    // @ts-ignore
    case Boolean(formData.energySource?.value.length) === true &&
      // @ts-ignore
      Boolean(formData.electricityProvider?.value.length) === false &&
      // @ts-ignore
      Boolean(formData.gasProvider?.value.length) === false:
      error = "Select an energy provider";
      break;
    case formData.file === null:
      error = "Add a device Image";
      break;
    default:
      break;
  }
  return error;
};

//TRANSPORT VALIDATION
const transportSchema = Joi.object({
  transportPhoto: Joi.object().required().messages({
    "any.required": "Transport photo must be uploaded",
  }),
  transportId: Joi.object().allow(null).messages({
    any: "Transport ID must be uploaded",
  }),
  driversLicense: Joi.object().allow(null).messages({
    any: "Driver's license must be uploaded",
  }),
  licensePlateNumber: Joi.string().required().messages({
    "string.empty": "License plate number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
  }),
});

export const validateTransportInputs = (formData: ITransport) => {
  const { error } = transportSchema.validate(formData);
  return error ? error.details[0].message : null;
};

export const getRemainingHours = (): string[] => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours(); // Get the current hour (0-23)

  const remainingHours = 23 - currentHour; // Calculate remaining hours until midnight

  // Create an array of remaining hours as strings
  const hoursArray = Array.from({ length: remainingHours + 1 }, (_, i) =>
    (currentHour + i + 1).toString()
  );

  return ["4", "6"];

  return hoursArray;
};

export const getStartTimes = (workingPeriod: number) => {
  const now = new Date();
  const currentHour = now.getHours() + 1;
  const maxStartTime = currentHour + (22 - workingPeriod);

  const startTimes = [];

  for (let i = currentHour; i <= maxStartTime; i++) {
    startTimes.push(i % 24); // Wrap around 24 hours
  }

  return startTimes.map((hour) => `${hour}:00`); // Format in "HH:00"
};

/**
 * Generates allowed device working periods based on the dispatch window and start time.
 * @param dispatchWindow The total allowed working period in hours (max 18 hours).
 * @param startTime The start time for the working period in "HH:MM" format.
 * @returns An array of allowed working periods in hours.
 */
export function getAllowedWorkingPeriods(
  dispatchWindow: number,
  startTime: string
): number[] {
  // Ensure dispatchWindow is within the 18-hour limit
  const maxDispatchWindow = 6;
  if (dispatchWindow <= 0 || dispatchWindow > maxDispatchWindow) {
    throw new Error(
      `Dispatch window must be between 1 and ${maxDispatchWindow} hours.`
    );
  }

  // Parse the start time
  const [startHour, startMinute] = startTime.split(":").map(Number);
  if (
    isNaN(startHour) ||
    isNaN(startMinute) ||
    startHour < 0 ||
    startHour > 23 ||
    startMinute < 0 ||
    startMinute > 59
  ) {
    throw new Error('Invalid start time format. It should be "HH:MM".');
  }

  // Initialize the array to store allowed working periods
  const allowedPeriods: number[] = [];

  // Define a 1-hour increment for allowed periods
  const periodIncrement = 1;

  // Loop to generate allowed periods
  for (
    let period = periodIncrement;
    period <= dispatchWindow;
    period += periodIncrement
  ) {
    // Calculate the end time for this period
    const periodEndHour = (startHour + period) % 24;
    const periodEndMinute = startMinute;

    // Check if the period end time is within the dispatch window
    // We assume the working period ends at most 18 hours later
    const endHour = (startHour + dispatchWindow) % 24;

    if (
      endHour >= periodEndHour ||
      (endHour === periodEndHour && startMinute <= periodEndMinute)
    ) {
      allowedPeriods.push(period);
    }
  }

  return allowedPeriods;
}

export const getWorkingPeriodHours = (dispatchWindow: number) => {
  let arr: number[] = [];

  Array.from({ length: dispatchWindow - 1 }, (_, i) => {
    arr.push(i + 1);
  });

  return arr;
};

export const stripColonAndReturnNumber = (time: string): number => {
  const [hour] = time.split(":");
  return parseInt(hour, 10);
};

export const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const formatChartLabel = (chartData: IDeviceChartData[]) => {
  return chartData.map((item) => {
    return formDateWithTime(item.from_date as unknown as string, true);
  });
};

export const getPowerDataSet = (chartData: IDeviceChartData[]) => {
  return chartData.map((item) => item.total_power);
};

export const getEmissionDataSet = (chartData: IDeviceChartData[]) => {
  return chartData.map((item) => item.emissions);
};

export const getTimeWithDay = (inputTime: string): string => {
  const [hours, minutes] = inputTime.split(":").map(Number);

  const now = new Date();

  const inputDate = new Date();
  inputDate.setHours(hours, minutes, 0, 0);

  if (inputDate > now) {
    return `${inputTime} (today)`;
  } else {
    return `${inputTime} (tomorrow)`;
  }
};

export const roundNumber = (
  value: number,
  decimalPlaces: number = 2
): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
};

export const getMerchantRoleColor: IComponentMap = {
  [UserRole.MERCHANT]: "bg-teal-900",
  [UserRole.REPORT_MERCHANT]: "bg-teal-700",
  [UserRole.SUPER_MERCHANT]: "bg-teal-500",
  [UserRole.GRANT_MERCHANT]: "bg-teal-400",
};
