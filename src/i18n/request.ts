import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '@/lib/i18n';
 
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is never undefined
  const safeLocale = locale || defaultLocale;
  
  return {
    locale: safeLocale,
    messages: {
      boilerplate: (await import(`../messages/${safeLocale}/boilerplate.json`)).default
    }
  };
});
