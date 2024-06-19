import React from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

const about = () => {
  return (
    <main className="overflow-hidden ">
      <Header />
      <div className="mt-[5rem] md:mt-[7rem] w-full p-8 flex flex-col gap-8 items-center">
        <h1 className=" font-bold text-4xl">About Us</h1>
        <div className="flex md:flex-row flex-col gap-8 p-8 self-center border-b-[1px]">
          <Image
            src="/people/Y_RAMANA.png"
            alt="ramana"
            height={250}
            width={250}
            className="self-center md:self-start"
          />
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Dr. Y.V.RAMANA</h1>
            <h2 className="font-medium">M.Sc, Ph.D(Managing Director)</h2>
            <p className="max-w-[60ch]">
              With experience of over 30 years in Shrimp culture by supporting R
              & D activities of the company to register record production of P.
              Monodon in the year 1994.
            </p>
            <p className="max-w-[60ch]">
              He was closely associated with Dr. R. Q. Gacutan, a noted
              Pathologist of those days from Philippines, and obtained in house
              training of disease diagnostics from Dr. Tim Flagel, of Mahidol
              university, Thailand.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-8 p-8 self-center border-b-[1px]">
          <Image
            src="/people/SUDHARSHAN.png"
            alt="sudharshan"
            height={250}
            width={250}
            className="self-center md:self-start block md:hidden"
          />
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Dr. R.SUDHARSHAN REDDY</h1>
            <h2 className="font-medium">M.Sc.,Ph.D(Director)</h2>
            <p className="max-w-[60ch]">
              The knowledge and experience in the field of Microbiology of Dr.
              Reddy, helped the company to focus and develop Biological and
              Organic products for Agriculture and Aquaculture.
            </p>
            <p className="max-w-[60ch]">
              In Microbiology, also worked in Rank Industries Ltd, as Senior
              Executive R&D, and supported a lot to achieve production based
              goals of the company.
            </p>
          </div>
          <Image
            src="/people/SUDHARSHAN.png"
            alt="sudharshan"
            height={250}
            width={250}
            className="self-center md:self-start hidden md:block"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-8 p-8 self-center">
          <Image
            src="/people/B_VASAGAN.jpg"
            alt="ramana"
            height={250}
            width={250}
            className="self-center md:self-start"
          />
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">THIRUPATHI VASAGAN B</h1>
            <h2 className="font-medium">(Director)</h2>
            <p className="max-w-[60ch]">
              Diploma In Fisheries Technology from CIT, Chennai, highly
              professional in Commercial Aquaculture practices, had excellent
              track record of achieving highest yields in modern Shrimp farming
              and was associated with Devi Sea Foods, in his early days.
            </p>
            <p className="max-w-[60ch]">
              His interest in Agriculture forced the company to market
              Bio-Organic – Agricultural products, specially designed to suit
              important Commercial and Vegetable crops.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default about;
