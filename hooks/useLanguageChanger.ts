import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

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

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      // @ts-ignore
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return {
    currentLocale,
    languages,
    getCurrentLanguage,
    handleLanguageChange,
    t,
  };
};
