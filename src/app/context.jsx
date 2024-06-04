'use client';
import React, { useState, createContext } from 'react';

export const ProductContext = createContext();

export const ContextProvider = ({ children }) => {
  const [category, setCategory] = useState('agri');
  return (
    <ProductContext.Provider value={{ category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
};
