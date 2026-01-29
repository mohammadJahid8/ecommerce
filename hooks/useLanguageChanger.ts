import { useTranslation } from 'react-i18next';
import { usePathname, useSearchParams } from 'next/navigation';
import i18nConfig from '@/i18nConfig';

export interface Language {
  code: string;
  label: string;
  icon?: any;
}

export const useLanguageChanger = () => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const languages: Language[] = [
    { code: 'en', label: t('language_english') },
    { code: 'es', label: t('language_spanish') },
  ];

  const getCurrentLanguage = (): Language => {
    return languages.find(lang => lang.code === currentLocale) || languages[0];
  };

  const handleLanguageChange = (newLocale: string) => {
    // Set the language cookie
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Change language without navigation (preserves React state)
    i18n.changeLanguage(newLocale);

    // Build new path with locale change
    let newPath =
      currentLocale === i18nConfig.defaultLocale &&
      // @ts-ignore
      !i18nConfig.prefixDefault
        ? '/' + newLocale + currentPathname
        : currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);

    // Preserve query parameters
    const queryString = searchParams.toString();
    if (queryString) {
      newPath = `${newPath}?${queryString}`;
    }

    // Update URL without navigation to reflect new locale
    window.history.replaceState(null, '', newPath);
  };

  return {
    currentLocale,
    languages,
    getCurrentLanguage,
    handleLanguageChange,
    t,
  };
};
