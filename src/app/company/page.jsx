import React from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

const page = () => {
  return (
    <main className="overflow-hidden h-screen">
      <Header />
      <div className="my-36 overflow-hidden h-full flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl mb-10 pb-2 border-b-[1px]">
          ABOUT CANDIDA
        </h1>
        <div className="grid md:grid-cols-2 h-full overflow-hidden">
          <div className="hidden md:flex justify-center">
            <Image
              src="/images/CANDIAD OFFICE.jpeg"
              alt="office_img"
              height={500}
              width={400}
              className="office_img rounded-full bg-center h-[500px] w-[400px]"
            />
          </div>
          <div className="relative blockTop h-full overflow-hidden ">
            <div className="pb-32 p-8 relative  flex flex-col gap-4 h-full overflow-y-scroll">
              <p className="mt-8">
                Candida Bio Sciences Pvt Ltd, incorporated in the year 2013 by a
                group of professionals serving aqua industry for more than three
                decades. The company started it’s journey with reliable and
                beneficial Biological and Organic products by educating farmers
                the Organic way of Shrimp culture, the very new concept of those
                days in Aqua culture. In this journey the company focused into
                Agriculture, where the indiscriminate use of Chemical Pesticides
                and Fungicides is very common, a major concern of environment
                and human health. To achieve the goal of Eco Friendly Organic
                way of cultivation, the company associated with other like
                minded companies, who involved in manufacturing Biological and
                Organic formulations serving in the fields of Aquaculture,
                Agriculture and Poultry industry.
              </p>
              <p>The major associates of CANDIDA are……</p>
              <ul className="list-decimal ml-4">
                <li>M/S MANGALORE BIOTECH LABORATORY, MANGALORE, KARNATAKA</li>
                <li>M/S SUJAY BIOTECH PVT LTD., VIJAYAWADA, ANDHRA PRADESH</li>
                <li>
                  M/S SASYA BIO REMEDIES PVT LTD., VIJAYAWADA, ANDHRA PRADESH
                </li>
              </ul>
              <p>
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-col gap-2">
                    <span className="font-medium">
                      1. Mangalore Biotech Laboratory:
                    </span>{' '}
                    A premier Biotech Laboratory based at Mangalore, promoted
                    and founded by Dr .P. TAURO, who served as Professor of
                    Eminence at ICAR for nearly two decades with likeminded
                    Personalities who are engaged in the field of Aquaculture,
                    manufacturing and marketing Speciality Probiotics
                    exclusively for aquaculture
                  </li>
                  <li className="flex flex-col gap-2">
                    <span className="font-medium">
                      2. SUJAY BIOTECH PVT LTD:
                    </span>{' '}
                    SUJAY BIOTECH PVT LTD., formerly named as Sujay Agri Labs,
                    established in the year 1995, in Vijayawada, A.P., under the
                    dynamic leadership of its managing Director Dr. M.LAKSHMI
                    PRASAD serving for the sustainability of Agriculture in the
                    states of Adhra Pradesh and Telangana. The company primarily
                    produced Bio Fertilizers and in the later years with
                    intensive research, able to produce Bio Pesticides and Bio
                    Fungicides.
                    <p>
                      Sujay Biotech is associated and had MOU with several
                      institutes and few of them are
                    </p>
                    <ol className="list-disc ml-8">
                      <li>University Malaysia , Kelantan</li>
                      <li>IIT MADRAS</li>
                      <li>University of Sabaragamuva, Srilanka</li>
                      <li>University Malaysia Pahang</li>
                      <li>
                        ICAR- IIOR (Indian Institute of Oil Seeds Research)
                      </li>
                    </ol>
                  </li>
                  <li className="flex flex-col gap-2">
                    <span className="font-medium">
                      3. SASYA BIO REMEDIES PVT LTD
                    </span>{' '}
                    Engaged in manufacturing Micronutrients to cater the
                    requirements of different agricultural crops since 2002, and
                    currently R & D is going on to develop nano technological
                    Micro and Macro nutrients, so that minimising the wastage as
                    well as cost.
                  </li>
                </ul>
              </p>
              <p className="mb-16">
                <span className="font-medium">CANDIDA</span> is also in
                discussions with few other Giants who are working in the field
                of Agriculture and Poultry to introduce various Bio
                Technological Products in near future.
              </p>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
