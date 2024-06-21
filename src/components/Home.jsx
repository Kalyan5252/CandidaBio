'use client';
import React, { useState, useContext } from 'react';
import HeroSlideShow from './HeroSlideShow';
import AboutUs from './AboutUs';
import Header from './Header';
import Image from 'next/image';
import Link from 'next/link';
import Contact from './Contact';
import { ProductContext } from '@/app/context';
import { GeistSans } from 'geist/font/sans';

export const Home = () => {
  const { category, setCategory } = useContext(ProductContext);

  return (
    <main className={`overflow-hidden bg-[#07141C] ${GeistSans.className}`}>
      <Header />
      <div className="mt-[5rem] md:mt-[6rem] w-full h-full text-[#D0D0D0] bg-[#07141C] flex-center">
        {/* <div className="pattern opacity-5 z-[-10]">
          <Image
            src="/patterns/cocoa green.png"
            alt=""
            fill
            className="pointer-events-none"
          />
        </div> */}
        <div className="grid grid-rows-1 w-full gap-4">
          {/* <div className="px-4 items-center justify-center gap-4"> */}
          <div className="w-full flex p-12 flex-col justify-center items-center gap-8 md:gap-4">
            <div className="flex flex-col items-center">
              <h1 className="flex p-4 items-center flex-col font-bold lg:text-[4rem] text-[1.5rem] text-center md:text-[2rem] uppercase text-white">
                Organic solutions for <br />
                aquaculture & Agriculture
              </h1>
              {/* <h2 className="text-xl font-light">Bio Sciences</h2> */}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/products"
                className="px-4 py-3 bg-[#5FA53E] flex-center rounded-lg text-sm md:text-lg text-black text-center"
              >
                <button>Our Products</button>
              </Link>
              <Link
                href="/#contactUs"
                className="px-4 py-3 flex-center outline outline-[#5FA53E] text-[#5FA53E] rounded-lg"
              >
                <button>Contact Us</button>
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col gap-8">
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
            </div> */}
          {/* </div> */}
          {/* <div className="w-full h-3/6 md:h-full px-8 md:px-24 flex">
            <div className="h-full w-full rounded-lg relative">
              <Image
                src="/images/heroPaddy.jpeg"
                alt="img"
                fill
                className="rounded-lg"
              />
            </div>
          </div> */}
        </div>
      </div>

      <div
        className="w-full md:h-[100vh]  p-8 md:pt-28 md:p-12 flex flex-col gap-12"
        id="highlights"
      >
        {/* <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold">Products</h1>
          <Link href="/products" className="hover:underline">
            Show all
          </Link>
        </div> */}

        <div className="w-full h-full md:rounded-full rounded-[35px]">
          <div className="w-ful h-full flex items-center justify-center overflow-y-auto">
            <HeroSlideShow />
          </div>
        </div>
      </div>

      <div className="md:mt-0 w-full md:flex p-10 items-center justify-center md:min-h-[50vh] text-[#D0D0D0] bg-[#07141C]">
        <p className="font-medium md:text-4xl text-xl text-left md:text-center md:max-w-[30ch] md:leading-[4rem] leading-[2rem]">
          Promote organic farming methods and natural biotechnological
          formulations to enhance sustainability and benefit the agriculture &
          aquaculture.
        </p>
      </div>
      <div className="w-full bg-white">
        <AboutUs />
      </div>
      <div className="md:px-8 py-4 bg-white">
        <Contact />
      </div>
    </main>
  );
};
