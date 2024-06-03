import React from 'react';
import Header from '@/components/Header';
import Products from '@/components/Products';
import defaultLayout from '../defaultLayout';

const page = () => {
  return (
    <defaultLayout>
      <main className="pt-25">
        <Header />
        <Products />
      </main>
    </defaultLayout>
  );
};

export default page;
