import { test, expect } from '@playwright/test';
import {
  formatDate,
  parseDate,
  parseISODate,
  isValidDate,
  getDaysDifference,
  addDaysToDate,
  formatDateRange,
  isDateBetween,
  getStartOfDay,
  getEndOfDay,
} from '../../src/lib/utils/date';

test.describe('Date Utility Functions', () => {
  test.describe('formatDate', () => {
    test('formats a date correctly with default format', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      expect(formatDate(date)).toBe('2025-04-04');
    });

    test('formats a date correctly with custom format', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      expect(formatDate(date, 'MM/dd/yyyy')).toBe('04/04/2025');
      expect(formatDate(date, 'MMMM d, yyyy')).toBe('April 4, 2025');
    });

    test('handles string dates', () => {
      expect(formatDate('2025-04-04')).toBe('2025-04-04');
    });

    test('handles invalid dates', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  test.describe('parseDate', () => {
    test('parses a date string correctly', () => {
      const parsedDate = parseDate('04/04/2025', 'MM/dd/yyyy');
      expect(parsedDate instanceof Date).toBe(true);
      expect(parsedDate?.getFullYear()).toBe(2025);
      expect(parsedDate?.getMonth()).toBe(3); // 0-based, so 3 is April
      expect(parsedDate?.getDate()).toBe(4);
    });

    test('returns null for invalid date strings', () => {
      expect(parseDate('invalid', 'MM/dd/yyyy')).toBe(null);
      expect(parseDate('', 'MM/dd/yyyy')).toBe(null);
    });
  });

  test.describe('parseISODate', () => {
    test('parses an ISO date string correctly', () => {
      const parsedDate = parseISODate('2025-04-04T12:00:00Z');
      expect(parsedDate instanceof Date).toBe(true);
      expect(parsedDate?.getUTCFullYear()).toBe(2025);
      expect(parsedDate?.getUTCMonth()).toBe(3); // 0-based, so 3 is April
      expect(parsedDate?.getUTCDate()).toBe(4);
    });

    test('returns null for invalid ISO date strings', () => {
      expect(parseISODate('invalid')).toBe(null);
      expect(parseISODate('')).toBe(null);
    });
  });

  test.describe('isValidDate', () => {
    test('returns true for valid dates', () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate('2025-04-04')).toBe(true);
      expect(isValidDate(Date.now())).toBe(true);
    });

    test('returns false for invalid dates', () => {
      expect(isValidDate('invalid')).toBe(false);
      expect(isValidDate('')).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
    });
  });

  test.describe('getDaysDifference', () => {
    test('calculates the difference in days correctly', () => {
      const date1 = new Date(2025, 3, 4); // April 4, 2025
      const date2 = new Date(2025, 3, 1); // April 1, 2025
      expect(getDaysDifference(date1, date2)).toBe(3);
      expect(getDaysDifference(date2, date1)).toBe(-3);
    });

    test('handles string dates', () => {
      expect(getDaysDifference('2025-04-04', '2025-04-01')).toBe(3);
    });
  });

  test.describe('addDaysToDate', () => {
    test('adds days to a date correctly', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      const newDate = addDaysToDate(date, 3);
      expect(newDate instanceof Date).toBe(true);
      expect(newDate?.getFullYear()).toBe(2025);
      expect(newDate?.getMonth()).toBe(3); // 0-based, so 3 is April
      expect(newDate?.getDate()).toBe(7);
    });

    test('handles negative days', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      const newDate = addDaysToDate(date, -3);
      expect(newDate instanceof Date).toBe(true);
      expect(newDate?.getFullYear()).toBe(2025);
      expect(newDate?.getMonth()).toBe(3); // 0-based, so 3 is April
      expect(newDate?.getDate()).toBe(1);
    });

    test('handles string dates', () => {
      const newDate = addDaysToDate('2025-04-04', 3);
      expect(newDate instanceof Date).toBe(true);
      expect(formatDate(newDate as Date, 'yyyy-MM-dd')).toBe('2025-04-07');
    });
  });

  test.describe('formatDateRange', () => {
    test('formats a date range correctly with default format', () => {
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(formatDateRange(startDate, endDate)).toBe('2025-04-04 - 2025-04-10');
    });

    test('formats a date range correctly with custom format', () => {
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(formatDateRange(startDate, endDate, 'MM/dd/yyyy')).toBe('04/04/2025 - 04/10/2025');
    });

    test('handles string dates', () => {
      expect(formatDateRange('2025-04-04', '2025-04-10')).toBe('2025-04-04 - 2025-04-10');
    });
  });

  test.describe('isDateBetween', () => {
    test('returns true when date is between start and end dates (inclusive)', () => {
      const date = new Date(2025, 3, 5); // April 5, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate)).toBe(true);
    });

    test('returns true when date is equal to start date (inclusive)', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate)).toBe(true);
    });

    test('returns true when date is equal to end date (inclusive)', () => {
      const date = new Date(2025, 3, 10); // April 10, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate)).toBe(true);
    });

    test('returns false when date is equal to start date (exclusive)', () => {
      const date = new Date(2025, 3, 4); // April 4, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate, false)).toBe(false);
    });

    test('returns false when date is before start date', () => {
      const date = new Date(2025, 3, 3); // April 3, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate)).toBe(false);
    });

    test('returns false when date is after end date', () => {
      const date = new Date(2025, 3, 11); // April 11, 2025
      const startDate = new Date(2025, 3, 4); // April 4, 2025
      const endDate = new Date(2025, 3, 10); // April 10, 2025
      expect(isDateBetween(date, startDate, endDate)).toBe(false);
    });
  });

  test.describe('getStartOfDay', () => {
    test('returns the start of the day', () => {
      const date = new Date(2025, 3, 4, 12, 30, 45); // April 4, 2025, 12:30:45
      const startOfDay = getStartOfDay(date);
      expect(startOfDay instanceof Date).toBe(true);
      expect(startOfDay?.getFullYear()).toBe(2025);
      expect(startOfDay?.getMonth()).toBe(3); // 0-based, so 3 is April
      expect(startOfDay?.getDate()).toBe(4);
      expect(startOfDay?.getHours()).toBe(0);
      expect(startOfDay?.getMinutes()).toBe(0);
      expect(startOfDay?.getSeconds()).toBe(0);
      expect(startOfDay?.getMilliseconds()).toBe(0);
    });
  });

  test.describe('getEndOfDay', () => {
    test('returns the end of the day', () => {
      const date = new Date(2025, 3, 4, 12, 30, 45); // April 4, 2025, 12:30:45
      const endOfDay = getEndOfDay(date);
      expect(endOfDay instanceof Date).toBe(true);
      expect(endOfDay?.getFullYear()).toBe(2025);
      expect(endOfDay?.getMonth()).toBe(3); // 0-based, so 3 is April
      expect(endOfDay?.getDate()).toBe(4);
      expect(endOfDay?.getHours()).toBe(23);
      expect(endOfDay?.getMinutes()).toBe(59);
      expect(endOfDay?.getSeconds()).toBe(59);
      expect(endOfDay?.getMilliseconds()).toBe(999);
    });
  });
});
