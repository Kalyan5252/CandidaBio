'use client';
import React, { useState, useContext } from 'react';
import HeroSlideShow from './HeroSlideShow';
import AboutUs from './AboutUs';
import Header from './Header';
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '@/app/context';
import Contact from './Contact';

export const Home = () => {
  const { category, setCategory } = useContext(ProductContext);
  return (
    <main className="overflow-hidden">
      <Header />
      <div className="mt-[5rem] md:mt-0 w-full h-[100vh] flex-center">
        <div className="pattern opacity-5 z-[-10]">
          <Image
            src="/patterns/cocoa green.png"
            alt=""
            fill
            className="pointer-events-none"
          />
        </div>
        <div className="grid grid-rows-2 h-full w-full">
          <div className="px-4 grid md:grid-cols-2 items-center justify-center gap-4">
            <div className="w-full  flex flex-col justify-center items-center md:items-center leading-[7rem]">
              <h1 className="font-bold lg:text-[7rem] md:text-[4rem] text-[450%] uppercase">
                Candida
              </h1>
              <span className="text-xl font-bold">Bio Sciences</span>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-[12px] md:text-[15px] text-gray-700">
                CANDIDA BIO SCIENCES PVT. LTD., is incorporated as Private
                limited Company with MCA, in the year 2013 under the able
                leadership of senior professionals who were serving Aquaculture,
                Agriculture Industry since 1992.
              </p>
              <p className="text-[12px] md:text-[15px] text-gray-700">
                The company made it as their policy – Educating farmers, the
                organic way of Farming, Promoting Natural/Bio-Technological
                /Organic formulations for the benefit and sustainability of
                industry.
              </p>
            </div>
          </div>
          <div className="p-4 ">
            <div className="bg-white h-full w-full  rounded-lg">
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
                    // src="/images/PADDY.jpeg"
                    alt="img"
                    fill
                    className="relative md:rounded-r-lg rounded-lg md:rounded-none homeAqua"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:flex p-10 items-center justify-center md:min-h-[50vh]">
        <p className="md:font-extrabold font-bold md:text-4xl text-2xl text-center md:max-w-[30ch] md:leading-[4rem] leading-7">
          Promote organic farming methods and natural biotechnological
          formulations to enhance sustainability and benefit the aquaculture
          industry.
        </p>
      </div>
      <div
        className="w-full md:h-[100vh]  p-8 md:pt-28 md:p-12 flex flex-col gap-12"
        id="highlights"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold">Products</h1>
          <Link href="/products" className="hover:underline">
            Show all
          </Link>
        </div>

        <div className="w-full h-full md:rounded-full rounded-[35px]">
          <div className="w-ful h-full flex items-center justify-center overflow-y-auto">
            <HeroSlideShow />
          </div>
        </div>
      </div>
      <div className="w-full">
        <AboutUs />
      </div>
      <div className="md:px-8 py-4">
        <Contact />
      </div>
    </main>
  );
};
