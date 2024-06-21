import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="p-8 flex flex-col" id="aboutUs">
      <h1 className="font-bold text-4xl">Team of Experts</h1>
      <div className="w-full overflow-scroll">
        <div className="py-8 flex justify-evenly overflow-scroll w-max md:w-full gap-4">
          <div className="abImgContainer">
            <div className="abImg">
              <Image
                src="/people/Y_RAMANA.png"
                alt="person"
                height={350}
                width={300}
                className="rounded-lg"
              />
            </div>

            <div className="flex-center flex-col">
              <h1>Dr. Y.V.RAMANA</h1>
              <h4 className="text-gray-400">Managing Director</h4>
            </div>
          </div>
          <div className="abImgContainer flex flex-col">
            <div className="abImg">
              <Image
                src="/people/B_VASAGAN.jpg"
                alt="person"
                height={350}
                width={300}
                className="rounded-lg"
              />
            </div>
            <div className="flex-center flex-col">
              <h1>THIRUPATHI VASAGAN B</h1>
              <h4 className="text-gray-400">Director</h4>
            </div>
          </div>
          <div className="abImgContainer">
            <div className="abImg">
              <Image
                src="/people/SUDHARSHAN.png"
                alt="person"
                height={350}
                width={300}
                className="rounded-lg"
              />
            </div>
            <div className="flex-center flex-col">
              <h1>Dr. R.SUDHARSHAN REDDY</h1>
              <h4 className="text-gray-400">Director</h4>
            </div>
          </div>

          {/* <div className="realtive bg-[#1e1e1e] text-white rounded-lg">
            <Image
              src="/img/people/Y_RAMANA.png"
              alt="person"
              height={400}
              width={400}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
