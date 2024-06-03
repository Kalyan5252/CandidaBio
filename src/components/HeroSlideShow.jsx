'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSlideShow = () => {
  const [slide, setSlide] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    const slides = document.querySelectorAll('.productSlide');
    const slider = document.querySelector('.slider');

    const updateSlides = () => {
      slides.forEach((e) => {
        e.classList.remove('productContainer');
      });
      slides[slide % slides.length].classList.add('productContainer');
      slides[slide % slides.length].classList.add('productTransform');
      if (slide === slides.length) {
        setSlide(1);
        slider.style.transform = `translateX(${0 * 1}px)`;
      } else {
        slider.style.transform = `translateX(${-100 * slide}%)`;
        setSlide(slide + 1);
      }
    };
    intervalRef.current = setInterval(updateSlides, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  });
  return (
    <Link
      href="/products"
      className="w-5/6 h-3/6 flex items-center justify-center relative md:w-4/6 md:h-full slideBg md:rounded-full rounded-[35px] border-[2px] border-gray-500"
    >
      <div className="sceneground hidden md:block"></div>
      <div className="hover opacity-0 absolute z-[100000] w-full h-full flex items-center justify-center font-bold bg-[rgba(0,0,0,0.5)] text-white md:text-2xl rounded-[35px] md:rounded-full">
        Click here to show more
      </div>
      <div className="w-full h-full flex justify-center items-center overflow-hidden pointer-events-none scrollNone">
        <div className="w-full h-max z-10 slider transition-all scrollNone">
          <div className="w-full h-full flex scrollNone">
            <div className="min-w-full  flex items-center justify-center productContainer productSlide ">
              <Image
                src="/images/product_6.png"
                alt=""
                width={500}
                height={200}
                className="productAnim productTransform"
              />
            </div>
            <div className="min-w-full flex items-center justify-center productContainer productSlide">
              <Image
                src="/images/product_1.png"
                alt=""
                width={200}
                height={200}
                className="productAnim "
              />
            </div>
            <div className="min-w-full flex items-center justify-center productSlide">
              <Image
                src="/images/product_2.png"
                alt=""
                width={200}
                height={200}
                className="productAnim "
              />
            </div>
            <div className="min-w-full flex items-center justify-center productSlide">
              <Image
                src="/images/product_3.png"
                alt=""
                width={200}
                height={200}
                className="productAnim "
              />
            </div>
            <div className="min-w-full flex items-center justify-center productSlide">
              <Image
                src="/images/product_4.png"
                alt=""
                width={200}
                height={200}
                className="productAnim "
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroSlideShow;

{
  /* <div className="">
  <Image
    src="/images/product_1.png"
    alt=""
    width={200}
    height={200}
    className="productAnim "
  />
</div>; */
}
