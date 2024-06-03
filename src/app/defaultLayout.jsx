import React from 'react';
import { ContextProvider } from './context';

const defaultLayout = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default defaultLayout;
