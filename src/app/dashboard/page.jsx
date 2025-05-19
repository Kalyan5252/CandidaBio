import React from 'react';
import Dashboard from '@/components/Dashboard';
import Head from '@/components/Head';

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-6 h-screen overflow-hidden">
      <Head />
      <Dashboard />
    </div>
  );
};

export default page;
