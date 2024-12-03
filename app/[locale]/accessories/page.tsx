import React from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/global/MainLayout';
import AccessoriesClient from '@/components/global/pages/AccessoriesClient';

export const metadata: Metadata = {
  title: 'Accessories',
  description: '',
};

const Accessories = () => {
  return (
    <MainLayout>
      <AccessoriesClient />
    </MainLayout>
  );
};

export default React.memo(Accessories);
