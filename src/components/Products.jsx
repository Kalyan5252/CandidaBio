'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductContext } from '@/app/context';
import Slideshow from './Slideshow';

const Products = () => {
  // const [category, setCategory] = useState('agri');
  const { category, setCategory } = useContext(ProductContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/products/${category}`);
        const json = await res.json();
        setData(json);
        console.log('get data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [category]);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative mt-[5rem] h-max  p-4 md:px-12">
        <Slideshow />
        <div className="absolute md:z-50 top-1 md:top-[-3rem] right-5 shadow-lg flex-center gap-4 px-4 py-2 rounded-full bg-[#C2C0C0] transition-all">
          <button
            onClick={() => {
              setCategory('agri');
            }}
            className={`${
              category === 'agri' ? 'bg-[#000] text-white' : 'text-black'
            } px-4 py-2 rounded-full`}
          >
            Agri
          </button>
          <button
            onClick={() => {
              setCategory('aqua');
            }}
            className={`${
              category === 'aqua' ? 'bg-[#000] text-white' : 'text-black'
            } px-4 py-2 rounded-full`}
          >
            Aqua
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-12 md:px-12 px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl md:text-4xl font-bold">Products</h2>
          <div className="flex-center gap-4 rounded-full shadow-lg border-[1px] border-gray-300 px-4 py-3 md:py-0">
            <input
              type="text"
              className="px-4 py-2 outline-none hidden md:block"
              placeholder="search product"
            />
            <button>
              <Image
                src="/icons/search.svg"
                alt="search"
                height={30}
                width={30}
              />
            </button>
          </div>
        </div>
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
          {data &&
            data.products.map((el, i) => (
              <Link
                href={`/products/${el._id}`}
                className="productCard"
                key={i}
              >
                <div className="productImage px-4">
                  <Image
                    src={`/products/${el.productImage}`}
                    // src={`/products/product_1.png`}
                    alt="pimg"
                    height={200}
                    width={200}
                    // fill
                    className="gridImage"
                  />
                </div>
                <div className="flex flex-col self-start">
                  <h1 className="productName">{el.productName}</h1>
                  <h2 className="subTitle">{el.subTitle}</h2>
                </div>
              </Link>
            ))}
        </div>
        {!data && (
          <div className="flex items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
