'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

const page = ({ params }) => {
  const titles = {
    benefits: 'Benefits',
    moa: 'Mode of Application',
    details: 'Dosage & Application',
    precautions: 'Precautions',
  };
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}?type=id`);
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

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`/api/aws/${data.productImage}`);
      const imgLink = await response.json();
      setImageUrl(imgLink.url);
    };

    data && data.imgLoc !== 'local' && fetchImage();
  });

  return (
    <main className="pt-24">
      <Header />
      <div className="flex flex-col gap-4 p-8 md:px-14">
        {data && (
          <div className="flex flex-col gap-12">
            <div className="block md:hidden">
              <h1 className="font-bold text-[300%]">{data.productName}</h1>
              <h2 className="font-medium text-gray-500 text-sm max-w-[10rem]">
                {data.subTitle}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 h-full md:h-[80vh] md:overflow-hidden">
              <div className="productBg rounded-lg flex items-center justify-center">
                <Image
                  src={`${
                    data.imgLoc === 'local'
                      ? '/products/' + data.productImage
                      : imageUrl || ''
                  }`}
                  alt="img"
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
                    <h2 className="font-medium md:block hidden text-gray-500 text-sm">
                      {data.subTitle}
                    </h2>
                    {data.packing && (
                      <h3>
                        <span className="font-medium">Packing:</span>{' '}
                        {data.packing}
                      </h3>
                    )}
                  </div>

                  {data?.description[0] !== '' &&
                    data?.description.length !== 0 && (
                      <div className="flex flex-col gap-4 flex-1">
                        <h2 className="font-bold text-xl">Description</h2>
                        <div className="flex flex-col">
                          <ul
                            className={`flex flex-col gap-2 ${
                              showMore ? 'h-full' : 'max-h-[7rem]'
                            } overflow-hidden list-disc`}
                          >
                            {data.description.map((el, i) => {
                              return (
                                data.description[i] !== '' && (
                                  <li key={i} className="">
                                    {' · '}
                                    {data.description[i]}
                                  </li>
                                )
                              );
                            })}
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
                  {data.compostiion.length !== 0 &&
                    data.compostiion[0].value !== '' && (
                      <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-xl">Composition</h1>
                        <ul className="flex flex-col">
                          {data.compostiion.map((el, i) => {
                            if (el.title !== 'fr') {
                              return (
                                <li
                                  key={i}
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
                                  key={i}
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
                <div className="p-4 w-full">
                  <Link
                    href="/#contactUs"
                    className="font-bold rounded-lg bg-black text-white p-4 flex items-center justify-center text-center w-full hover:shadow-lg transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl">Product Hightlights</h1>
              <div className="flex items-center gap-4 ">
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
            <div className="grid md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              {['benefits', 'moa', 'details', 'precautions'].map((el) => {
                if (data[el] != '' && data[el][0]?.value != '')
                  return (
                    <div
                      key={el}
                      className="flex flex-col md:min-h-[20rem] bg-[#F5F5F5] items-center shadow-lg border-[1px] border-[#5E6572] p-4 rounded-lg"
                    >
                      <h1 className="font-bold text-xl capitalize mb-4">
                        {titles[el]}
                      </h1>
                      <div className="flex flex-col gap-2 w-full">
                        {data[el].map((ele) => {
                          // typeof el === 'object' && el.value !== '' ? (
                          //   <p key={el}>
                          //     {'· '}
                          //     {el.value}
                          //   </p>
                          // ) : (
                          //   <p key={el}>
                          //     {'· '}
                          //     {el}
                          //   </p>
                          // )
                          if (typeof ele === 'string')
                            return (
                              <p key={ele}>
                                {'· '}
                                {ele}
                              </p>
                            );
                          if (typeof ele === 'object' && ele.value !== '')
                            return (
                              <p key={ele}>
                                {'· '}
                                {ele.value}
                              </p>
                            );
                        })}
                      </div>
                    </div>
                  );
              })}
            </div>
            {data.certificate && (
              <div className="bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-lg min-h-32 p-8 flex flex-col gap-4 md:flex-row justify-around items-center">
                <div className="flex flex-col gap-2 items-center">
                  <p className="font-bold text-xl">CAA Product Certificate</p>
                  <p className="font-light text-xl">{data.certificateNo}</p>
                </div>
                <Link
                  href={`/certificates/${data.certificate}`}
                  target="__blank"
                  className="px-4 py-2 bg-white shadow-xl text-[#07141C] font-bold rounded-lg"
                >
                  Download Certificate
                </Link>
              </div>
            )}
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
