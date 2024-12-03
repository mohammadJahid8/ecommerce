/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import iconEs from '../../../assets/images/es.png';
import iconUs from '../../../assets/images/us.png';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '../../../i18nConfig';

export default function LanguageMenu() {
  const { i18n: vrI18n } = useTranslation();
  const vrCurrentLocale = vrI18n.language;
  const vrCurrentPathname = usePathname();
  const vrRouter = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    code: vrCurrentLocale,
    label: vrCurrentLocale === 'es' ? 'Español' : 'English',
    icon: vrCurrentLocale === 'es' ? iconEs : iconUs,
  });

  const languages = [
    { code: 'en', label: 'English', icon: iconUs },
    { code: 'es', label: 'Español', icon: iconEs },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (lang: typeof selectedLang) => {
    setSelectedLang(lang);
    setIsOpen(false);

    // Set the language cookie
    const vrDays = 30;
    const vrDate = new Date();
    vrDate.setTime(vrDate.getTime() + vrDays * 24 * 60 * 60 * 1000);
    const vrExpires = vrDate.toUTCString();
    document.cookie = `NEXT_LOCALE=${lang.code};expires=${vrExpires};path=/`;

    // Redirect to the new locale path
    if (
      vrCurrentLocale === i18nConfig.defaultLocale &&
      // @ts-ignore
      !i18nConfig.prefixDefault
    ) {
      vrRouter.push('/' + lang.code + vrCurrentPathname);
    } else {
      vrRouter.push(
        vrCurrentPathname.replace(`/${vrCurrentLocale}`, `/${lang.code}`)
      );
    }

    vrRouter.refresh();
  };

  return (
    <div className='relative inline-block w-max text-left'>
      <button
        onClick={toggleDropdown}
        className='flex items-center gap-2 text-xs'
      >
        <img
          src={selectedLang.icon.src}
          alt={selectedLang.label}
          className='h-4 w-4'
        />
        {selectedLang.label}
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 dark:bg-black dark:border-gray-800',
            'bottom-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800',
                lang.code === selectedLang.code &&
                  'bg-gray-100 font-bold dark:bg-gray-800'
              )}
            >
              <img src={lang.icon.src} alt={lang.label} className='h-4 w-4' />
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
