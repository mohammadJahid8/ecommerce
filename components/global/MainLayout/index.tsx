'use client';
import React from 'react';

interface Iprops {
  children: any;
}

const MainLayout = (props: Iprops) => {
  return <>{props.children}</>;
};

export default React.memo(MainLayout);
