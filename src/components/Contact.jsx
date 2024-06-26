import React from 'react';
import Image from 'next/image';

const Contact = () => {
  return (
    <div
      id="contactUs"
      className="bg-[#1e1e1e] text-gray-300 flex flex-col gap-8 p-4 py-8 md:p-8 md:rounded-lg"
    >
      <div>
        <h1 className="font-bold text-4xl">Contact Us</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 ">
          <div className="flex">
            <h1 className="text-2xl font-medium ">
              Connect with us via{' '}
              <span className="text-white font-extrabold">Mail</span>
            </h1>
            <Image
              src="/icons/arrow.png"
              alt="icon"
              height={100}
              width={100}
              className="rotate-[-365deg] scale-x-[-1]"
            />
          </div>
          <div className="self-center">
            <Image
              src="/images/WhatsAppQR.png"
              alt="Qr"
              height={200}
              width={200}
            />
          </div>
          {/* <span className="relative h-[1px] w-full bg-white"> */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-[10rem] h-[1px] bg-white"></div>
            <h1 className="text-xl">or</h1>
            <div className="w-[10rem] h-[1px] bg-white"></div>
          </div>
          <a
            href="mailto:cbsaquaa@gmail.com"
            className="text-white hover:underline text-center"
            // target="_blank"
          >
            click here to mail us
          </a>
        </div>
        <div className="md:p-4 flex flex-col  md:gap-2  gap-4 bg-[rgba(255,255,255,0.2)] rounded-lg">
          <div className="p-4 flex gap-4 items-center rounded-lg ">
            <div className="bg-gray-200 p-4 rounded-full">
              <Image src="/icons/mail.png" alt="mail" height={22} width={22} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Email</h2>
              <a
                className="font-light"
                href="mailto:cbsaquaa@gmail.com"
                // target="_blank"
                type="email"
              >
                cbsaquaa@gmail.com
              </a>
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center rounded-lg ">
            <div className="bg-gray-200 p-4 rounded-full">
              <Image src="/icons/phone.png" alt="call" height={22} width={22} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Phone</h2>
              <h2 className="font-light">+91 9440278604</h2>
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center rounded-lg ">
            <div className="bg-gray-200 p-4 rounded-full">
              <Image
                src="/icons/location.png"
                alt="pin"
                height={22}
                width={22}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Location</h2>
              <h2 className="font-light max-w-[20rem]">
                D.NO.16-2-441 2nd Floor S.V.Agraharam NELLORE -524002
              </h2>
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center rounded-lg ">
            <div className="bg-gray-200 p-4 rounded-full">
              <Image src="/icons/link.png" alt="pin" height={22} width={22} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">GoogleMaps</h2>
              <a
                className="font-light drop-shadow-md max-w-[20rem] text-blue-300 hover:underline"
                href="https://www.google.com/maps/place/Agricultural+Society/@14.3908314,80.0823968,787m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3a4cf58c60178389:0x9dd6ba62fd0575e!2sAgraharam!8m2!3d14.3893245!4d80.0835241!16s%2Fg%2F11tf6w31dn!3m5!1s0x3a4cf5e5b12f17e7:0xde989ee840586928!8m2!3d14.3896964!4d80.0835994!16s%2Fg%2F11llkp7t6l?entry=ttu"
                target="_blank"
              >
                Click Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
