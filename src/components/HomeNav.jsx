import React from 'react';

const HomeNav = () => {
  return (
    <div className="grid md:grid-cols-2 h-full rounded-lg md:px-0 px-12 gap-4 md:gap-0 ">
      <Link
        href="/products"
        className="relative w-full h-full shadow-xl"
        onClick={() => {
          setCategory('agri');
        }}
      >
        <div className="hover opacity-0 absolute z-[1] w-full h-full flex items-center justify-center font-bold rounded-lg md:rounded-l-lg md:rounded-none bg-[rgba(0,0,0,0.5)] text-white text-2xl ">
          AGRICULTURE
        </div>
        <Image
          src="/images/PADDY.jpeg"
          alt="img"
          fill
          className="rounded-lg md:rounded-l-lg md:rounded-none homeAgri z-[0]"
        />
      </Link>
      <Link
        href="/products"
        className="relative w-full h-full shadow-xl"
        onClick={() => {
          setCategory('aqua');
        }}
      >
        <div className="hover opacity-0 absolute z-[1] w-full h-full flex items-center justify-center font-bold md:rounded-r-lg rounded-lg md:rounded-none bg-[rgba(0,0,0,0.5)] text-white text-2xl ">
          AQUACULTURE
        </div>
        <Image
          src="/images/aqua.png"
          alt="img"
          fill
          className="relative md:rounded-r-lg rounded-lg md:rounded-none homeAqua"
        />
      </Link>
    </div>
  );
};

export default HomeNav;
