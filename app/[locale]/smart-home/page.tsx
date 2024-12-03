import React from 'react';
import { Metadata } from 'next';
import SmartHomeClient from '@/components/global/pages/SmartHomeClient';
import { getSmartsHome } from '@/services/home/smart-home.services';

export const metadata: Metadata = {
  title: 'Smart Home',
  description: '',
};

const SmartHome = async () => {
  const smartHomes = await getSmartsHome();

  return <SmartHomeClient smartHomes={(smartHomes && smartHomes) || []} />;
};

export default React.memo(SmartHome);
