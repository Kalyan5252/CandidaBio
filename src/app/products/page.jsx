'use client';
import React from 'react';
import Header from '@/components/Header';
import Products from '@/components/Products';

import { useState, useContext } from 'react';
import { ProductContext } from '@/app/context';

const page = () => {
  return (
    <main className="pt-25">
      <Header />
      <Products />
    </main>
  );
};

export default page;
