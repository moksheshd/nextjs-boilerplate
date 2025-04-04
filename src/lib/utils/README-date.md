# Date Utility Functions

This module provides a set of utility functions for working with dates using the [date-fns](https://date-fns.org/) library.

## Installation

The date utility functions depend on the date-fns library. If you haven't installed it yet, you can do so with:

```bash
npm install date-fns
```

## Usage

Import the functions you need from the date utility module:

```typescript
import { formatDate, parseDate, addDaysToDate } from '@/lib/utils/date';
```

## Available Functions

### formatDate

Formats a date using the specified format string.

```typescript
formatDate(date: Date | string | number, formatString = 'yyyy-MM-dd'): string
```

Example:

```typescript
const date = new Date(2025, 3, 4); // April 4, 2025
formatDate(date); // '2025-04-04'
formatDate(date, 'MM/dd/yyyy'); // '04/04/2025'
formatDate(date, 'MMMM d, yyyy'); // 'April 4, 2025'
```

### formatRelativeDate

Formats a date in a human-readable relative format.

```typescript
formatRelativeDate(date: Date | string | number, baseDate = new Date()): string
```

Example:

```typescript
const date = new Date(Date.now() - 86400000); // 1 day ago
formatRelativeDate(date); // '1 day ago'
```

### parseDate

Parses a date string into a Date object using the specified format.

```typescript
parseDate(dateString: string, formatString: string): Date | null
```

Example:

```typescript
parseDate('04/04/2025', 'MM/dd/yyyy'); // Date object for April 4, 2025
```

### parseISODate

Parses an ISO date string into a Date object.

```typescript
parseISODate(dateString: string): Date | null
```

Example:

```typescript
parseISODate('2025-04-04T12:00:00Z'); // Date object for April 4, 2025, 12:00:00 UTC
```

### isValidDate

Checks if a value is a valid date.

```typescript
isValidDate(date: any): boolean
```

Example:

```typescript
isValidDate(new Date()); // true
isValidDate('2025-04-04'); // true
isValidDate('invalid'); // false
```

### getDaysDifference

Gets the difference between two dates in days.

```typescript
getDaysDifference(dateLeft: Date | string | number, dateRight: Date | string | number): number
```

Example:

```typescript
const date1 = new Date(2025, 3, 4); // April 4, 2025
const date2 = new Date(2025, 3, 1); // April 1, 2025
getDaysDifference(date1, date2); // 3
```

### addDaysToDate

Adds a specified number of days to a date.

```typescript
addDaysToDate(date: Date | string | number, amount: number): Date | null
```

Example:

```typescript
const date = new Date(2025, 3, 4); // April 4, 2025
addDaysToDate(date, 3); // Date object for April 7, 2025
```

### formatDateRange

Formats a date range as a string.

```typescript
formatDateRange(startDate: Date | string | number, endDate: Date | string | number, formatString = 'yyyy-MM-dd'): string
```

Example:

```typescript
const startDate = new Date(2025, 3, 4); // April 4, 2025
const endDate = new Date(2025, 3, 10); // April 10, 2025
formatDateRange(startDate, endDate); // '2025-04-04 - 2025-04-10'
```

### isDateBetween

Checks if a date is between two other dates.

```typescript
isDateBetween(date: Date | string | number, startDate: Date | string | number, endDate: Date | string | number, inclusive = true): boolean
```

Example:

```typescript
const date = new Date(2025, 3, 5); // April 5, 2025
const startDate = new Date(2025, 3, 4); // April 4, 2025
const endDate = new Date(2025, 3, 10); // April 10, 2025
isDateBetween(date, startDate, endDate); // true
```

### getStartOfDay

Gets the start of a day (00:00:00.000).

```typescript
getStartOfDay(date: Date | string | number): Date | null
```

Example:

```typescript
const date = new Date(2025, 3, 4, 12, 30, 45); // April 4, 2025, 12:30:45
getStartOfDay(date); // Date object for April 4, 2025, 00:00:00.000
```

### getEndOfDay

Gets the end of a day (23:59:59.999).

```typescript
getEndOfDay(date: Date | string | number): Date | null
```

Example:

```typescript
const date = new Date(2025, 3, 4, 12, 30, 45); // April 4, 2025, 12:30:45
getEndOfDay(date); // Date object for April 4, 2025, 23:59:59.999
```

## Error Handling

All functions include error handling to prevent crashes. If an error occurs, the functions will return an appropriate default value (empty string, null, 0, or false) and log the error to the console.

## Testing

Unit tests for these functions are available in `tests/unit/date.spec.ts`.
