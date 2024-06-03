'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';

const page = ({ params }) => {
  const titles = {
    benefits: 'Benefits',
    moa: 'Mode of Application',
    details: 'Dosage & Application',
    precautions: 'Precautions',
  };
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${params.productId}?type=id`
        );
        const json = await res.json();
        setData(json.products[0]);
        // console.log('get json:', json.products[0]);
        // console.log('get data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);
  return (
    <main className="pt-24">
      <Header />
      <div className="flex flex-col gap-4 p-8 md:px-14">
        {data && (
          <div className="flex flex-col gap-12">
            <div className="block md:hidden">
              <h1 className="font-bold text-[300%]">{data.productName}</h1>
              <h2 className="font-medium">{data.subTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 h-full md:h-[80vh] md:overflow-hidden">
              <div className="productBg rounded-lg flex items-center justify-center">
                <Image
                  src={`/products/${data.productImage}`}
                  alt=""
                  height={300}
                  width={300}
                  className="pointer-events-none productImg"
                />
              </div>

              <div className="flex flex-col gap-12 justify-between md:max-h-full md:overflow-hidden">
                <div className="flex flex-col gap-4 overflow-scroll md:p-4">
                  <div>
                    <h1 className="font-bold text-[300%] md:block hidden">
                      {data.productName}
                    </h1>
                    <h2 className="font-medium md:block hidden">
                      {data.subTitle}
                    </h2>
                    {data.packing && (
                      <h3>
                        <span className="font-medium">Packing:</span>{' '}
                        {data.packing}
                      </h3>
                    )}
                  </div>

                  {data?.description && (
                    <div className="flex flex-col gap-4 flex-1">
                      <h2 className="font-bold text-xl">Description</h2>
                      <div className="flex flex-col">
                        <ul
                          className={`flex flex-col gap-2 ${
                            showMore ? 'h-full' : 'max-h-[7rem]'
                          } overflow-hidden list-disc`}
                        >
                          {data.description.map((el, i) => (
                            <li key={i} className="">
                              {' · '}
                              {data.description[i]}
                            </li>
                          ))}
                        </ul>
                        <button
                          className="self-end text-gray-400 p-4 mt-[-1rem]"
                          onClick={() => {
                            setShowMore(!showMore);
                          }}
                        >
                          {showMore ? 'show less' : 'show more'}
                        </button>
                      </div>
                    </div>
                  )}
                  {data.compostiion.length !== 0 && (
                    <div className="flex flex-col gap-4">
                      <h1 className="font-bold text-xl">Composition</h1>
                      <ul className="flex flex-col">
                        {data.compostiion.map((el, i) => {
                          if (el.title !== 'fr') {
                            return (
                              <li
                                className={`flex justify-between items-center rounded-full `}
                              >
                                <p>{el.title}</p>
                                <p>{el.value}</p>
                              </li>
                            );
                          }
                          if (el.title === 'fr') {
                            return (
                              <li
                                className={`flex justify-between items-center rounded-full `}
                              >
                                <p>{el.value}</p>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="p-4 justify-self-start">
                  <button className="font-bold rounded-lg bg-black text-white p-4 w-full hover:shadow-lg transition-all">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl">Product Hightlights</h1>
              <div className="flex items-center gap-4 p-8">
                <Image
                  src="/images/ecofriendly.png"
                  alt="img"
                  height={150}
                  width={150}
                />
                <Image
                  src="/images/biovigor.png"
                  alt="img"
                  height={150}
                  width={150}
                />
              </div>
            </div>
            <div className="grid md:grid-flow-col md:grid-cols-4 p-4 gap-4">
              {['benefits', 'moa', 'details', 'precautions'].map((el) => {
                if (data[el] != '')
                  return (
                    <div className="flex flex-col md:min-h-[20rem] bg-[#F5F5F5] items-center shadow-lg border-[1px] border-[#5E6572] p-4 rounded-lg">
                      <h1 className="font-bold text-xl capitalize mb-4">
                        {titles[el]}
                      </h1>
                      <div className="flex flex-col gap-2">
                        {data[el].map((el) => {
                          if (typeof el === 'string')
                            return (
                              <p>
                                {'· '}
                                {el}
                              </p>
                            );
                          if (typeof el === 'object') {
                            return (
                              <p>
                                {'· '}
                                {el.value}
                              </p>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
              })}
            </div>
            {/* {data.precautions.length !== 0 && (
              <div className="p-4 flex flex-col gap-4">
                <h1 className="font-bold text-xl">Precautions</h1>
                <ul>
                  {data.precautions.map((el) => (
                    <li>
                      {'· '}
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}
        {!data && (
          <div className="flex h-[100vh] items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
