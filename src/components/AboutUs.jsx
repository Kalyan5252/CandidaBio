import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="p-8 flex flex-col" id="aboutUs">
      <h1 className="font-bold text-2xl md:text-4xl">Team of Experts</h1>
      <div className="py-4 grid grid-flow-col md:grid-cols-4 overflow-auto gap-4">
        <div className="realtive bg-[#1e1e1e] text-white rounded-lg">
          <Image
            src="/img/people/Y_RAMANA.png"
            alt="person"
            height={400}
            width={400}
          />
        </div>
        <div className="realtive bg-[#1e1e1e] text-white rounded-lg">
          <Image
            src="/img/people/Y_RAMANA.png"
            alt="person"
            height={400}
            width={400}
          />
        </div>
        <div className="realtive bg-[#1e1e1e] text-white rounded-lg">
          <Image
            src="/img/people/Y_RAMANA.png"
            alt="person"
            height={400}
            width={400}
          />
        </div>
        <div className="realtive bg-[#1e1e1e] text-white rounded-lg">
          <Image
            src="/img/people/Y_RAMANA.png"
            alt="person"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
