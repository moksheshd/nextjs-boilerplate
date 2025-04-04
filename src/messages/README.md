# Internationalization (i18n) with next-intl

This directory contains the translation files for the application. The application uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization.

## Directory Structure

- `en/`: English translations

Each language directory contains:

- `index.json`: Main translation file

## Adding a New Language

To add a new language:

1. Create a new directory for the language (e.g., `fr/` for French)
2. Copy the `index.json` file from an existing language directory
3. Translate the strings in the copied file
4. Add the language code to the `locales` array in `src/lib/i18n.ts`

## Translation File Structure

The translation files are structured as nested objects. For example:

```json
{
  "Index": {
    "title": "Welcome to ICAI-UDIN",
    "description": "A Next.js application with internationalization support"
  },
  "Navigation": {
    "home": "Home",
    "about": "About"
  }
}
```

## Using Translations in Components

To use translations in your components:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  // Get translations for the "Index" namespace
  const t = useTranslations('Index');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Language Switcher

The application includes a `LanguageSwitcher` component that allows users to switch between languages:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Layout() {
  return (
    <div>
      <LanguageSwitcher />
      {/* Rest of your layout */}
    </div>
  );
}
```

## Middleware

The application uses Next.js middleware to handle language detection and routing. The middleware is configured in `src/middleware.ts`.

## Configuration

The internationalization configuration is in `src/lib/i18n.ts`. It exports:

- `locales`: An array of supported locale codes
- `defaultLocale`: The default locale
- `getMessages`: A function to load messages for a specific locale
