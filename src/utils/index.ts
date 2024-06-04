import { DataRow } from "@/types/generics";
import { clsx, ClassValue } from "clsx";
import { Country } from "country-state-city";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const getLongestKeyLength = (data: any[]) => {
  return Math.max(...data.map((obj) => Object.keys(obj).length));
};

// Function to find object with the most keys
export const findObjectWithMostKeys = (
  data: DataRow<any>[]
): DataRow<any> | undefined => {
  if (!data.length) return undefined; // Handle empty data array
  return data.reduce((maxObject, currentObject) =>
    Object.keys(currentObject).length > Object.keys(maxObject).length
      ? currentObject
      : maxObject
  );
};

type ObjectType = { [key: string]: any };

export function uniqueObjectsByIdType<T extends ObjectType>(arr: T[]): T[] {
  const idTypeValuesMap = new Map<T[keyof T], T>();

  // Iterate through the array and store objects based on idType
  arr.forEach((obj) => {
    const id = obj.idType; // Assuming idType exists in the object
    if (!idTypeValuesMap.has(id)) {
      idTypeValuesMap.set(id, obj);
    }
  });

  // Return the values of the map as an array
  return Array.from(idTypeValuesMap.values());
}

export function downloadFile(fileUrl: string, fileName: string) {
  fetch(fileUrl)
    .then((response) => {
      // Check if response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Convert response to blob
      return response.blob();
    })
    .then((blob) => {
      // Create a new URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      // Create a new anchor element
      const link = document.createElement("a");
      // Set the href attribute to the blob URL
      link.href = blobUrl;
      // Set the download attribute to the file name
      link.download = fileName;
      // Simulate click on the anchor element
      link.click();
      // Clean up by revoking the blob URL
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

export function convertImageToDataURL(file: File) {
  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    // Check if the file size is greater than 2MB
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error("File size exceeds 2MB"));
      return;
    }

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("Error reading the file"));
    };
    reader.readAsDataURL(file);
  });
}

export const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
  event.preventDefault(); // Prevent the default behavior of scrolling

  // Blur the input to prevent it from being focused and scrolled
  event.currentTarget.blur();
};

export function formatLargeNumber(num: number): string {
  const suffixes: string[] = ["", "K", "M", "B"];
  const suffixNum: number = Math.floor(("" + num).length / 3);
  let shortNum: number = parseFloat(
    (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(2)
  );
  if (shortNum % 1 !== 0) {
    shortNum = Number(shortNum.toFixed(1));
  }
  return shortNum + suffixes[suffixNum];
}

export function getLastFiveYears(): {
  label: string;
  value: string;
  id?: string | number | undefined;
}[] {
  const currentYear = new Date().getFullYear();
  const yearsData: {
    label: string;
    value: string;
    id?: string | number | undefined;
  }[] = [];

  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    yearsData.push({ label: year.toString(), value: year.toString() });
  }

  return yearsData;
}

export function getLastTwelveMonths(): {
  label: string;
  value: string;
  id?: string | number | undefined;
}[] {
  const currentMonth = new Date().getMonth(); // getMonth() returns zero-based index
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsData: {
    label: string;
    value: string;
    id?: string | number | undefined;
  }[] = [];

  for (let i = 0; i < 12; i++) {
    let monthIndex = (currentMonth - i) % 12;
    if (monthIndex < 0) {
      monthIndex += 12;
    }
    const monthName = monthNames[monthIndex];
    monthsData.unshift({
      label: `${monthName}`,
      value: (monthIndex + 1).toString(),
    });
  }

  return monthsData;
}

export function getCurrentMonthAbbreviation(): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
}

export const generateUserCurrency = (countryName: string) => {
  let countryData = Country.getAllCountries();

  const currency = countryData.filter(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  )[0].currency;
  return currency;
};

export const stripNumbersFromAlphanumeric = (inputString: string): string => {
  // Use a regular expression to match all numbers in the string
  const numbersOnly = inputString.replace(/[^0-9]/g, "");

  return numbersOnly;
};

/**
 * Formats a numeric string by adding commas for readability.
 * @param value - The numeric string to format.
 * @returns The formatted string with commas.
 */
export const formatNumberWithCommas = (value: string | number): string => {
  // Convert the value to a string
  const numericString = value.toString();

  // Remove any existing commas
  const numericStringWithoutCommas = numericString.replace(/,/g, "");

  // Validate that the input is a valid number (including decimals)
  const regex = /^[0-9]*\.?[0-9]*$/;
  if (!regex.test(numericStringWithoutCommas)) {
    throw new Error(
      "Invalid input: Only numeric values including decimals are allowed."
    );
  }

  // Split the input into integer and decimal parts
  const [integerPart, decimalPart] = numericStringWithoutCommas.split(".");

  // Format the integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Return the formatted number, combining integer and decimal parts if present
  return decimalPart !== undefined
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
};

/**
 * Converts a formatted readable string (with commas) to a number.
 * @param formattedString - The formatted string with commas.
 * @returns The number representation of the string.
 */
export const convertFormattedStringToNumber = (
  formattedString: string
): number => {
  // Remove commas from the string
  const numericString = formattedString.replace(/,/g, "");

  // Convert the string to a number
  const numberValue = parseFloat(numericString);

  if (isNaN(numberValue)) {
    toast.error("Invalid input: The string cannot be converted to a number.", {
      id: "Input error",
    });
  }

  return numberValue;
};
