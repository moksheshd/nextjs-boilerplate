// Define the list of supported locales
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

// Define the default locale
export const defaultLocale = 'en' as const;

// Helper function to load messages for a specific locale
export async function getMessages(locale: Locale) {
  return {
    boilerplate: (await import(`../messages/${locale}/boilerplate.json`)).default
  };
}
