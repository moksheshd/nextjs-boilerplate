/**
 * Math utility functions for demonstration purposes
 */

/**
 * Adds two numbers together
 * @param a First number
 * @param b Second number
 * @returns The sum of a and b
 */
export function sum(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts the second number from the first
 * @param a First number
 * @param b Second number to subtract
 * @returns The difference between a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param a First number
 * @param b Second number
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides the first number by the second
 * @param a Dividend
 * @param b Divisor
 * @returns The quotient of a divided by b
 * @throws Error if b is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Calculates the average of an array of numbers
 * @param numbers Array of numbers
 * @returns The average of the numbers
 * @throws Error if the array is empty
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error('Cannot calculate average of an empty array');
  }
  
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

/**
 * Finds the maximum value in an array of numbers
 * @param numbers Array of numbers
 * @returns The maximum value
 * @throws Error if the array is empty
 */
export function max(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error('Cannot find maximum of an empty array');
  }
  
  return Math.max(...numbers);
}

/**
 * Finds the minimum value in an array of numbers
 * @param numbers Array of numbers
 * @returns The minimum value
 * @throws Error if the array is empty
 */
export function min(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error('Cannot find minimum of an empty array');
  }
  
  return Math.min(...numbers);
}
