'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('verfication');
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (res.ok) {
        router.push('/uploadProduct');
      }
    };
    verify();
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const [body, setBody] = useState({ email: '', password: '' });
  const handleSubmit = async () => {
    const res = await fetch('/api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setTimeout(() => router.push('/uploadProduct'), 2000);
      return toast('Logged In!!!.', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
      });
    } else {
      setTimeout(() => {
        handleReload();
      }, 1000);
      return toast('Incorrect Credentials!!!.', {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false,
        type: 'error',
      });
    }
  };
  return (
    <div className="min-h-screen flex-center bg-gray-200">
      {/* <Toast /> */}
      <div className="p-6 rounded-lg bg-white outline outline-[0.5px] outline-gray-400 flex flex-col gap-4 min-w-[20rem]">
        <div>
          <h1 className="font-bold text-2xl text-center text-gray-600">
            Login
          </h1>
          <hr />
        </div>
        <form
          action={handleSubmit}
          className="flex w-full flex-col gap-4 text-gray-700"
        >
          <div>
            <h2 className="">Email Id</h2>
            <input
              type="text"
              id="pName"
              placeholder="Admin Mail"
              required
              className="w-full text-gray-700"
              onChange={(e) => setBody({ ...body, email: e.target.value })}
            />
          </div>

          <div>
            <h2 className="">Password</h2>
            <input
              type="password"
              id="pass"
              placeholder="Password"
              required
              className="w-full"
              onChange={(e) => setBody({ ...body, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 font-bold self-center text-gray-300 rounded-lg hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
