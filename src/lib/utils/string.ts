/**
 * String utility functions for demonstration purposes
 */

/**
 * Capitalizes the first letter of a string
 * @param str The input string
 * @returns The string with the first letter capitalized
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Reverses a string
 * @param str The input string
 * @returns The reversed string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 * @param str The input string
 * @param maxLength The maximum length of the string
 * @param ellipsis The ellipsis to add if truncated (default: '...')
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + ellipsis;
}

/**
 * Converts a string to camelCase
 * @param str The input string
 * @returns The camelCase string
 */
export function camelCase(str: string): string {
  if (!str) return '';
  
  // Check if the string is already in camelCase format
  // This is a simple check - if it has no spaces, underscores, or hyphens
  // and it starts with a lowercase letter
  if (/^[a-z][a-zA-Z0-9]*$/.test(str) && 
      !str.includes(' ') && 
      !str.includes('_') && 
      !str.includes('-')) {
    return str;
  }
  
  // Replace non-alphanumeric characters with spaces
  const normalized = str.replace(/[^\w\s]/g, ' ');
  
  // Split by spaces and other separators
  const words = normalized.split(/[\s_-]+/);
  
  // First word lowercase, rest capitalized
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      // Use capitalize function to ensure proper casing
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Converts a string to snake_case
 * @param str The input string
 * @returns The snake_case string
 */
export function snakeCase(str: string): string {
  if (!str) return '';
  
  // Replace non-alphanumeric characters with spaces
  const normalized = str.replace(/[^\w\s]/g, ' ');
  
  // Split by spaces, capitalize boundaries, and other separators
  const words = normalized
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .split(/[\s_-]+/);
  
  // Join with underscores
  return words
    .map(word => word.toLowerCase())
    .filter(word => word.length > 0)
    .join('_');
}

/**
 * Counts the occurrences of a substring in a string
 * @param str The input string
 * @param substring The substring to count
 * @returns The number of occurrences
 */
export function countOccurrences(str: string, substring: string): number {
  if (!str || !substring) return 0;
  
  let count = 0;
  let position = str.indexOf(substring);
  
  while (position !== -1) {
    count++;
    position = str.indexOf(substring, position + 1);
  }
  
  return count;
}
