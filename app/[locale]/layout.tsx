import type { Metadata } from 'next';
import './globals.css';
import TopProgressBar from '@/components/global/TopProgressBar';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { getCategories } from '@/services/home/home.services';
import initTranslations from '@/utils/i18n';
import TranslationsProvider from '@/utils/translator-provider';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/utils/theme-provider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
  openGraph: {
    title: 'Shop',
    type: 'website',
    siteName: 'Shop',
    description:
      'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
    images: [
      {
        url: 'https://raw.githubusercontent.com/NguyenTienHao97/HealthApp/main/dogs.png',
      },
    ],
  },
  twitter: {
    title: 'Shop',
    site: 'Shop',
    description:
      'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
    images: [
      {
        url: 'https://raw.githubusercontent.com/NguyenTienHao97/HealthApp/main/dogs.png',
      },
    ],
  },
};

const i18nNamespaces = ['global'];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const categories = await getCategories();
  //@ts-ignore
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} className={roboto.className}>
      <body className='dark:bg-[#050505]'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
          >
            <TopProgressBar />
            <Header categories={categories} />
            {children}
            <Footer />
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
