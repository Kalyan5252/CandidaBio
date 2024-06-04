'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductContext } from '@/app/context';
import Slideshow from './Slideshow';
import { useRouter } from 'next/navigation';

const Products = () => {
  const router = useRouter();
  // const [category, setCategory] = useState('agri');
  const { category, setCategory } = useContext(ProductContext);
  // DATA FETCHED FROM DB
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // DATA PRESENTED ON CLIENT UI
  const [actualData, setActualData] = useState(null);
  // let actualData;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/products/${category}`);
        const json = await res.json();
        setData(json);
        setActualData(json);
        // console.log('get data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [category]);

  const handleSearch = () => {
    if (searchQuery === '') {
      setData(actualData);
      return;
    }

    console.log('this is actual', actualData);
    const newData = [];
    actualData.products.map((el) => {
      const words = el.productName.split(' ');
      words.forEach((word) => {
        if (
          word.toLowerCase() === searchQuery.toLowerCase() ||
          word.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          newData.push(el);
        }
      });
    });
    console.log({ products: newData });
    setData({ products: newData });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative mt-[5rem] h-max  p-4 md:px-12">
        <Slideshow />
        <div className="absolute md:z-40 top-3 md:top-1 right-5 shadow-lg flex-center gap-4 px-4 py-2 rounded-full bg-[#C2C0C0] transition-all">
          <button
            onClick={() => {
              setCategory('agri');
              router.push('/products#products');
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
              router.push('/products#products');
            }}
            className={`${
              category === 'aqua' ? 'bg-[#000] text-white' : 'text-black'
            } px-4 py-2 rounded-full`}
          >
            Aqua
          </button>
        </div>
      </div>

      <div
        className="flex flex-col gap-12 md:px-12 px-8 pt-8 mt-[-2rem]"
        id="products"
      >
        <div className="flex flex-col gap-4 md:flex-row justify-start md:justify-between md:items-center">
          <h2 className="text-4xl font-bold">Products</h2>
          <div className="px-4">
            <form
              action={handleSearch}
              className="productForm flex w-full md:w-fit self-end  gap-4 rounded-full shadow-lg border-[1px] border-gray-300 px-4 py-2 md:py-0"
            >
              <input
                type="text"
                className="px-4 py-2 outline-none block w-full productInput"
                placeholder="search product"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Image
                  src="/icons/search.svg"
                  alt="search"
                  height={20}
                  width={20}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {data &&
            data.products.map((el, i) => (
              <Link
                href={`/products/${el._id}`}
                className="productCard"
                key={i}
              >
                <div className="productImage px-4 text-white">
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
