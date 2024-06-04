import React from 'react';
import { ContextProvider } from './context';

const DefaultLayout = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default DefaultLayout;
