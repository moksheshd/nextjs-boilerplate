import { test, expect } from '@playwright/test';
import { sum, subtract, multiply, divide, average, max, min } from '../../src/lib/utils/math';

test.describe('Math Utility Functions', () => {
  test.describe('sum', () => {
    test('adds two positive numbers correctly', () => {
      expect(sum(1, 2)).toBe(3);
      expect(sum(5, 7)).toBe(12);
    });

    test('handles negative numbers correctly', () => {
      expect(sum(-1, -2)).toBe(-3);
      expect(sum(-5, 3)).toBe(-2);
      expect(sum(5, -3)).toBe(2);
    });

    test('handles zero correctly', () => {
      expect(sum(0, 0)).toBe(0);
      expect(sum(0, 5)).toBe(5);
      expect(sum(5, 0)).toBe(5);
    });

    test('handles decimal numbers correctly', () => {
      expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
      expect(sum(1.5, 2.5)).toBe(4);
    });
  });

  test.describe('subtract', () => {
    test('subtracts two positive numbers correctly', () => {
      expect(subtract(5, 2)).toBe(3);
      expect(subtract(10, 5)).toBe(5);
    });

    test('handles negative numbers correctly', () => {
      expect(subtract(-1, -2)).toBe(1);
      expect(subtract(-5, 3)).toBe(-8);
      expect(subtract(5, -3)).toBe(8);
    });

    test('handles zero correctly', () => {
      expect(subtract(0, 0)).toBe(0);
      expect(subtract(0, 5)).toBe(-5);
      expect(subtract(5, 0)).toBe(5);
    });
  });

  test.describe('multiply', () => {
    test('multiplies two positive numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(4, 5)).toBe(20);
    });

    test('handles negative numbers correctly', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(2, -3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });

    test('handles zero correctly', () => {
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
    });
  });

  test.describe('divide', () => {
    test('divides two positive numbers correctly', () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(10, 5)).toBe(2);
    });

    test('handles negative numbers correctly', () => {
      expect(divide(-6, 2)).toBe(-3);
      expect(divide(6, -2)).toBe(-3);
      expect(divide(-6, -2)).toBe(3);
    });

    test('handles division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });

    test('handles decimal results correctly', () => {
      expect(divide(5, 2)).toBe(2.5);
      expect(divide(1, 3)).toBeCloseTo(0.333333, 5);
    });
  });

  test.describe('average', () => {
    test('calculates average of positive numbers correctly', () => {
      expect(average([1, 2, 3])).toBe(2);
      expect(average([5, 10, 15])).toBe(10);
    });

    test('handles negative numbers correctly', () => {
      expect(average([-1, -2, -3])).toBe(-2);
      expect(average([-5, 0, 5])).toBe(0);
    });

    test('handles single element array correctly', () => {
      expect(average([5])).toBe(5);
    });

    test('throws error for empty array', () => {
      expect(() => average([])).toThrow('Cannot calculate average of an empty array');
    });
  });

  test.describe('max', () => {
    test('finds maximum in array of positive numbers', () => {
      expect(max([1, 2, 3])).toBe(3);
      expect(max([5, 10, 3])).toBe(10);
    });

    test('handles negative numbers correctly', () => {
      expect(max([-1, -2, -3])).toBe(-1);
      expect(max([-5, 0, 5])).toBe(5);
    });

    test('handles single element array correctly', () => {
      expect(max([5])).toBe(5);
    });

    test('throws error for empty array', () => {
      expect(() => max([])).toThrow('Cannot find maximum of an empty array');
    });
  });

  test.describe('min', () => {
    test('finds minimum in array of positive numbers', () => {
      expect(min([1, 2, 3])).toBe(1);
      expect(min([5, 10, 3])).toBe(3);
    });

    test('handles negative numbers correctly', () => {
      expect(min([-1, -2, -3])).toBe(-3);
      expect(min([-5, 0, 5])).toBe(-5);
    });

    test('handles single element array correctly', () => {
      expect(min([5])).toBe(5);
    });

    test('throws error for empty array', () => {
      expect(() => min([])).toThrow('Cannot find minimum of an empty array');
    });
  });
});
