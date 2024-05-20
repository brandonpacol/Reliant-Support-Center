import { Priority } from "../types/Ticket";

/**
 * This function takes the ISO date string and returns the MMddyy format of it
 * @param ticketTime the ISO string returned from the server
 * @returns String of the date in MMddyy format
 */
export function getFormattedDateString(ticketTime: string) {
  try {

    const date = new Date(ticketTime);
    if (date instanceof Date && !isNaN(date.getTime())) { // check that this is a valid date

      // Set up the options for MMddyy format
      const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      };
      const dateStr = date.toLocaleString('en-us', options);
      return dateStr;

    }

  } catch (err) {
    console.error("Error in getDateString: ", err);
  }
  return "";
}

/**
 * This function return the priority name string given the number
 * @param priorityValue number of the priority
 * @returns String of the priority name
 */
export function getPriorityName(priorityValue: number): string | undefined {
  return Priority[priorityValue];
}