'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
  {
    path: '/images/CRD007.jpg',
    alt: 'img1',
  },
  {
    path: '/images/CRD003.jpeg',
    alt: 'img2',
  },
  {
    path: '/images/FARMER.jpeg',
    alt: 'img3',
  },
  {
    path: '/images/GRAPE.jpeg',
    alt: 'img3',
  },
  {
    path: '/images/CRD006.jpg',
    alt: 'img4',
  },
  {
    path: '/images/CRD001.jpg',
    alt: 'img5',
  },
  {
    path: '/images/PEPPER.jpeg',
    alt: 'img5',
  },
  {
    path: '/images/20240429_101636.jpg',
    alt: 'img1',
  },
  {
    path: '/images/aqua.png',
    alt: 'img1',
  },
];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the slide after a certain time (e.g., every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <div className="w-full h-[50vh] overflow-hidden relative rounded-lg">
        {IMAGES.map((ele, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={ele.path}
              alt={ele.alt}
              className="w-full h-full object-cover "
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {IMAGES.map((el, index) => (
          <div
            className={`h-2 w-2 ${
              currentIndex === index ? 'bg-gray-600 shadow-lg' : 'bg-gray-400'
            } rounded-full cursor-pointer`}
            key={index}
            onClick={(e) => {
              setCurrentIndex(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
