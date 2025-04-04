import { test, expect } from '@playwright/test';
import { 
  capitalize, 
  reverse, 
  truncate, 
  camelCase, 
  snakeCase, 
  countOccurrences 
} from '../../src/lib/utils/string';

test.describe('String Utility Functions', () => {
  test.describe('capitalize', () => {
    test('capitalizes the first letter and lowercases the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('javaScript')).toBe('Javascript');
    });

    test('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    test('handles strings with non-alphabetic characters', () => {
      expect(capitalize('123abc')).toBe('123abc');
      expect(capitalize('!hello')).toBe('!hello');
    });
  });

  test.describe('reverse', () => {
    test('reverses strings correctly', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
      expect(reverse('a')).toBe('a');
    });

    test('handles empty strings', () => {
      expect(reverse('')).toBe('');
    });

    test('handles palindromes', () => {
      expect(reverse('radar')).toBe('radar');
      expect(reverse('level')).toBe('level');
    });

    test('handles strings with spaces and special characters', () => {
      expect(reverse('hello world')).toBe('dlrow olleh');
      expect(reverse('a!b@c#')).toBe('#c@b!a');
    });
  });

  test.describe('truncate', () => {
    test('truncates strings longer than maxLength', () => {
      expect(truncate('hello world', 5)).toBe('hello...');
      expect(truncate('testing truncation', 10)).toBe('testing tr...');
    });

    test('does not truncate strings shorter than or equal to maxLength', () => {
      expect(truncate('hello', 5)).toBe('hello');
      expect(truncate('hello', 10)).toBe('hello');
    });

    test('handles empty strings', () => {
      expect(truncate('', 5)).toBe('');
    });

    test('uses custom ellipsis when provided', () => {
      expect(truncate('hello world', 5, '***')).toBe('hello***');
      expect(truncate('testing', 4, '!')).toBe('test!');
    });
  });

  test.describe('camelCase', () => {
    test('converts space-separated strings to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('foo bar baz')).toBe('fooBarBaz');
    });

    test('converts kebab-case strings to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
    });

    test('converts snake_case strings to camelCase', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('foo_bar_baz')).toBe('fooBarBaz');
    });

    test('handles strings with mixed separators', () => {
      expect(camelCase('hello_world-foo bar')).toBe('helloWorldFooBar');
    });

    test('handles empty strings', () => {
      expect(camelCase('')).toBe('');
    });

    test('handles strings that are already camelCase', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
    });
  });

  test.describe('snakeCase', () => {
    test('converts space-separated strings to snake_case', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
      expect(snakeCase('foo bar baz')).toBe('foo_bar_baz');
    });

    test('converts kebab-case strings to snake_case', () => {
      expect(snakeCase('hello-world')).toBe('hello_world');
      expect(snakeCase('foo-bar-baz')).toBe('foo_bar_baz');
    });

    test('converts camelCase strings to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz');
    });

    test('handles strings with mixed separators', () => {
      expect(snakeCase('hello_world-foo bar')).toBe('hello_world_foo_bar');
    });

    test('handles empty strings', () => {
      expect(snakeCase('')).toBe('');
    });

    test('handles strings that are already snake_case', () => {
      expect(snakeCase('hello_world')).toBe('hello_world');
    });
  });

  test.describe('countOccurrences', () => {
    test('counts occurrences of a substring correctly', () => {
      expect(countOccurrences('hello world', 'l')).toBe(3);
      expect(countOccurrences('banana', 'a')).toBe(3);
      expect(countOccurrences('hello hello', 'hello')).toBe(2);
    });

    test('returns 0 when substring is not found', () => {
      expect(countOccurrences('hello world', 'z')).toBe(0);
      expect(countOccurrences('banana', 'x')).toBe(0);
    });

    test('handles empty strings', () => {
      expect(countOccurrences('', 'a')).toBe(0);
      expect(countOccurrences('hello', '')).toBe(0);
      expect(countOccurrences('', '')).toBe(0);
    });

    test('handles overlapping occurrences', () => {
      expect(countOccurrences('abababa', 'aba')).toBe(3);
    });
  });
});
