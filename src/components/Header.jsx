'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [istop, setIsTop] = useState(true);
  const [isMobile, setisMobile] = useState(false);
  const handleNavbar = () => {
    setNavbar(!navbar);
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    });
  });

  return (
    <div
      className={`${
        istop
          ? 'bg-[#07141C] flex-between'
          : 'bg-[#1e1e1e] flex flex-between  md:bg-transparent md:justify-center'
      } p-4 fixed top-0 left-0 w-full z-50`}
    >
      {/* // <div className="flex-between p-4 bg-[#F9FBF2] fixed top-0 left-0 w-full z-10"> */}
      <Image
        src="/images/CandidaLogo-1.png"
        alt="logo"
        height={50}
        width={50}
        className={`rounded-full hidden md:block ${
          istop ? 'md:opacity-1' : 'md:opacity-0'
        }`}
      />
      <div
        className={`hidden md:flex ${
          istop
            ? 'bg-transparent text-[#d0d0d0]'
            : 'bg-[rgba(30,30,30,0.9)] backdrop-blur-sm text-[#d0d0d0]'
        } z-40 md:shadow-2xl md:flex-center gap-12 p-4 text-lg rounded-lg transition-all`}
      >
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <Link href="/aboutUs" className="hover:text-white">
          About Us
        </Link>
        <Link href="/products" className="hover:text-white">
          Products
        </Link>
        <Link href="/#contactUs" className="hover:text-white">
          Contact Us
        </Link>
      </div>
      <div
        className={`${
          istop ? 'block' : 'md:hidden'
        } text-gray-300 font-bold text-2xl`}
      >
        Candida
      </div>
      <div className="block md:hidden ">
        <button onClick={handleNavbar}>
          <Image src="/icons/menu.svg" alt="menu" height={25} width={25} />
        </button>
      </div>
      {navbar ? (
        <div className="fixed h-full w-full bg-[#1e1e1e] top-0 left-0 p-8 text-gray-300">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-12 text-2xl">
              <div className="flex-between">
                <h1 className="font-bold">CandidaBio</h1>
                <button onClick={handleNavbar}>
                  <Image
                    src="/icons/close.svg"
                    alt="menu"
                    height={25}
                    width={25}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="hover:text-white"
                  onClick={handleNavbar}
                >
                  Home
                </Link>
                <Link
                  href="/aboutUs"
                  className="hover:text-white"
                  onClick={handleNavbar}
                >
                  About Us
                </Link>
                <Link
                  href="/products"
                  className="hover:text-white"
                  onClick={handleNavbar}
                >
                  Products
                </Link>
                <Link
                  href="/#contactUs"
                  className="hover:text-white"
                  onClick={handleNavbar}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <h3 className="self-center">copyright@Candidabio</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
