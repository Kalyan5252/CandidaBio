import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
