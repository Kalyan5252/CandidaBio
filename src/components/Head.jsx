import React from 'react';
import Link from 'next/link';

const Head = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-medium text-2xl">
        <span className="font-bold">Candida</span> BioSciences
      </h1>
      <Link
        href={'/uploadProduct'}
        className="bg-black rounded-lg px-4 py-2 text-white font-medium hover:shadow-lg"
      >
        Add Product
      </Link>
    </div>
  );
};

export default Head;
