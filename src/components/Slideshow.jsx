'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Slideshow = () => {
  const [slides, setSlides] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  // const [allSlides, setAllSlides] = useState(null);
  const slideRef = useRef([]);

  useEffect(() => {
    const allSlides = document.querySelectorAll('.pSlide');

    const slideContainer = document.querySelector('.SlidesContainer');
    setSlides(allSlides.length);
    const updateSlides = () => {
      allSlides.forEach((el, i) => {
        if (i === currentSlide) {
          el.classList.add('activeSlide');
          // el.classList.remove('leftSlide');
          // el.classList.remove('rightSlide');
        } else if (i < currentSlide) {
          el.classList.add('deactivated');
          // el.classList.add('leftSlide');
          el.classList.remove('activeSlide');
          // el.classList.remove('rightSlide');
        } else if (i > currentSlide) {
          el.classList.add('deactivated');
          // el.classList.add('rightSlide');
          el.classList.remove('activeSlide');
          // el.classList.remove('leftSlide');
        }
      });
      if (currentSlide !== 0) {
        // console.log('translating');
        if (window.innerWidth > 768) {
          slideContainer.style.transform = `translateX(${
            -allSlides[currentSlide % allSlides.length].getBoundingClientRect()
              .x + allSlides[0].getBoundingClientRect().x
          }px)`;
        } else {
          slideContainer.style.transform = `translateX(-${
            85.1 * currentSlide
          }%)`;
        }
      } else {
        slideContainer.style.transform = `translateX(0px)`;
      }
      // console.log(
      //   allSlides[currentSlide % allSlides.length].getBoundingClientRect()
      // );
      setCurrentSlide((currentSlide + 1) % allSlides.length);
      for (let i = 0; i < slides; i++) {
        if (currentSlide == i) {
          slideRef.current[i].style.background = 'rgb(156 163 175)';
        } else {
          slideRef.current[i].style.background = 'rgb(229 231 235)';
        }
      }
      // slideRef.current[currentSlide].style.background = 'rgb(229 231 235)';
    };
    intervalRef.current = setInterval(updateSlides, 2000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, slides]);

  return (
    <div className="overflow-x-scroll pointer-events-none mt-10 scrollNone">
      <div className="md:w-max p-8 relative md:h-full SlidesContainer  flex gap-4 transition-all scrollNone">
        {/* <div className="slideContainer"></div> */}
        <Image
          src="/images/CRD007.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide activeSlide firstSlide transition-all"
        />

        <Image
          src="/images/CRD003.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        <Image
          src="/images/CRD008.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        {/* <Image
          src="/images/CRD009.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        /> */}
        <Image
          src="/images/CRD006.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        <Image
          src="/images/CRD001.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        {/* <Image
          src="/images/Cardamom Flower with Fruits.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        /> */}
        <Image
          src="/images/PADDY.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        <Image
          src="/images/GRAPE.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        <Image
          src="/images/Farmer.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated transition-all"
        />
        {/* <Image
          src="/images/PADDY.jpeg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated lastSlide transition-all"
        /> */}
      </div>

      <div className="flex justify-center gap-1">
        {slides &&
          Array.from({ length: slides }, (_, i) => i).map((_, i) => {
            return (
              <span
                key={i}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative"
                ref={(el) => {
                  slideRef.current[i] = el;
                }}
              ></span>
            );
          })}
      </div>
    </div>
  );
};

export default Slideshow;
