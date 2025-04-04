import {
  format,
  formatDistance,
  isValid,
  parse,
  parseISO,
  isDate,
  addDays,
  differenceInDays,
  isBefore,
  isAfter,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';

/**
 * Format a date using date-fns
 * @param date The date to format
 * @param formatString The format string (default: 'yyyy-MM-dd')
 * @returns The formatted date string
 */
export function formatDate(date: Date | string | number, formatString = 'yyyy-MM-dd'): string {
  if (!date) return '';

  try {
    const dateObj = ensureDate(date);
    if (!isValid(dateObj)) return '';

    return format(dateObj, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Format a date in a human-readable relative format (e.g., "2 days ago")
 * @param date The date to format
 * @param baseDate The base date to compare to (default: now)
 * @returns The relative date string
 */
export function formatRelativeDate(
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string {
  if (!date) return '';

  try {
    const dateObj = ensureDate(date);
    const baseDateObj = ensureDate(baseDate);

    if (!isValid(dateObj) || !isValid(baseDateObj)) return '';

    return formatDistance(dateObj, baseDateObj, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
}

/**
 * Parse a date string into a Date object
 * @param dateString The date string to parse
 * @param formatString The format string
 * @returns The parsed Date object
 */
export function parseDate(dateString: string, formatString: string): Date | null {
  if (!dateString || !formatString) return null;

  try {
    const parsedDate = parse(dateString, formatString, new Date());
    return isValid(parsedDate) ? parsedDate : null;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

/**
 * Parse an ISO date string into a Date object
 * @param dateString The ISO date string to parse
 * @returns The parsed Date object
 */
export function parseISODate(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    const parsedDate = parseISO(dateString);
    return isValid(parsedDate) ? parsedDate : null;
  } catch (error) {
    console.error('Error parsing ISO date:', error);
    return null;
  }
}

/**
 * Check if a value is a valid date
 * @param date The value to check
 * @returns True if the value is a valid date
 */
export function isValidDate(date: unknown): boolean {
  if (!date) return false;

  try {
    if (isDate(date)) {
      return isValid(date);
    }

    if (typeof date === 'string') {
      return isValid(parseISO(date));
    }

    if (typeof date === 'number') {
      return isValid(new Date(date));
    }

    return false;
  } catch (error) {
    console.error('Error checking date validity:', error);
    return false;
  }
}

/**
 * Get the difference between two dates in days
 * @param dateLeft The first date
 * @param dateRight The second date
 * @returns The difference in days
 */
export function getDaysDifference(
  dateLeft: Date | string | number,
  dateRight: Date | string | number
): number {
  try {
    const dateLeftObj = ensureDate(dateLeft);
    const dateRightObj = ensureDate(dateRight);

    if (!isValid(dateLeftObj) || !isValid(dateRightObj)) return 0;

    return differenceInDays(dateLeftObj, dateRightObj);
  } catch (error) {
    console.error('Error calculating days difference:', error);
    return 0;
  }
}

/**
 * Add days to a date
 * @param date The date to add days to
 * @param amount The number of days to add
 * @returns The new date
 */
export function addDaysToDate(date: Date | string | number, amount: number): Date | null {
  try {
    const dateObj = ensureDate(date);

    if (!isValid(dateObj)) return null;

    return addDays(dateObj, amount);
  } catch (error) {
    console.error('Error adding days to date:', error);
    return null;
  }
}

/**
 * Format a date range
 * @param startDate The start date
 * @param endDate The end date
 * @param formatString The format string (default: 'yyyy-MM-dd')
 * @returns The formatted date range string
 */
export function formatDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
  formatString = 'yyyy-MM-dd'
): string {
  try {
    const startDateObj = ensureDate(startDate);
    const endDateObj = ensureDate(endDate);

    if (!isValid(startDateObj) || !isValid(endDateObj)) return '';

    const formattedStartDate = format(startDateObj, formatString);
    const formattedEndDate = format(endDateObj, formatString);

    return `${formattedStartDate} - ${formattedEndDate}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return '';
  }
}

/**
 * Check if a date is between two other dates
 * @param date The date to check
 * @param startDate The start date
 * @param endDate The end date
 * @param inclusive Whether to include the start and end dates (default: true)
 * @returns True if the date is between the start and end dates
 */
export function isDateBetween(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusive = true
): boolean {
  try {
    const dateObj = ensureDate(date);
    const startDateObj = ensureDate(startDate);
    const endDateObj = ensureDate(endDate);

    if (!isValid(dateObj) || !isValid(startDateObj) || !isValid(endDateObj)) return false;

    if (inclusive) {
      return (
        (isAfter(dateObj, startDateObj) || isSameDay(dateObj, startDateObj)) &&
        (isBefore(dateObj, endDateObj) || isSameDay(dateObj, endDateObj))
      );
    }

    return isAfter(dateObj, startDateObj) && isBefore(dateObj, endDateObj);
  } catch (error) {
    console.error('Error checking if date is between:', error);
    return false;
  }
}

/**
 * Get the start of a day
 * @param date The date
 * @returns The start of the day
 */
export function getStartOfDay(date: Date | string | number): Date | null {
  try {
    const dateObj = ensureDate(date);

    if (!isValid(dateObj)) return null;

    return startOfDay(dateObj);
  } catch (error) {
    console.error('Error getting start of day:', error);
    return null;
  }
}

/**
 * Get the end of a day
 * @param date The date
 * @returns The end of the day
 */
export function getEndOfDay(date: Date | string | number): Date | null {
  try {
    const dateObj = ensureDate(date);

    if (!isValid(dateObj)) return null;

    return endOfDay(dateObj);
  } catch (error) {
    console.error('Error getting end of day:', error);
    return null;
  }
}

/**
 * Helper function to ensure a value is a Date object
 * @param date The value to convert to a Date
 * @returns The Date object
 */
function ensureDate(date: Date | string | number): Date {
  if (isDate(date)) {
    return date as Date;
  }

  if (typeof date === 'string') {
    return parseISO(date);
  }

  return new Date(date);
}
