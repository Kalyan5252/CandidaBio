'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Slideshow = () => {
  const [slides, setSlides] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
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
          slideContainer.style.transform = `translateX(-${90 * currentSlide}%)`;
        }
      } else {
        slideContainer.style.transform = `translateX(0px)`;
      }
      console.log(
        allSlides[currentSlide % allSlides.length].getBoundingClientRect()
      );
      setCurrentSlide((currentSlide + 1) % allSlides.length);
    };
    intervalRef.current = setInterval(updateSlides, 2000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <div className="overflow-x-scroll pointer-events-none mt-10">
      <div className="md:w-max p-8 relative md:h-full SlidesContainer  flex gap-4 transition-all">
        {/* <div className="slideContainer"></div> */}
        <Image
          src="/images/CRD007.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide activeSlide firstSlide transition-all"
        />
        <Image
          src="/images/CRD008.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated rightSlide transition-all"
        />
        <Image
          src="/images/CRD009.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated  transition-all"
        />
        <Image
          src="/images/CRD006.jpg"
          alt="slide"
          height={300}
          width={300}
          className="pSlide deactivated lastSlide transition-all"
        />
      </div>
    </div>
  );
};

export default Slideshow;
