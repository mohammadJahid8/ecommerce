import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { getCategories } from '@/services/home/home.services';
import initTranslations from '@/utils/i18n';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <div>
      <Header categories={categories} />
      {children}
      <Footer />
    </div>
  );
}
