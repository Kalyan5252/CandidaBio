import React from 'react';
import Header from '@/components/Header';
import Products from '@/components/Products';
import DefaultLayout from '../defaultLayout';

const page = () => {
  return (
    <DefaultLayout>
      <main className="pt-25">
        <Header />
        <Products />
      </main>
    </DefaultLayout>
  );
};

export default page;
