import { useTranslations } from 'next-intl';
import { locales } from '@/lib/i18n';

/**
 * Language Switcher component
 *
 * Note: Currently only English is supported, so this component doesn't do anything.
 * It's kept as a placeholder for future localization needs.
 */
export default function LanguageSwitcher() {
  // Always get translations, even if we don't render anything
  const t = useTranslations('Common');

  // If only one locale is available, don't render anything
  if (locales.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{t('language')}:</span>
      <div className="flex space-x-1">
        {locales.map(locale => (
          <button key={locale} className="px-2 py-1 text-sm rounded bg-blue-500 text-white">
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
