'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    // console.log('verfication');
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (!res.ok) {
        router.push('/login');
      }
    };
    verify();
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('agri');
  const [packing, setPacking] = useState('');
  // const [dosage, setDosage] = useState('');
  // const [application, setApplication] = useState('');
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [descriptions, setDescriptions] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [moa, setMoa] = useState(['']);
  const [precautions, setPrecautions] = useState(['']);
  const [details, setDetails] = useState([
    { title: 'Dosage', value: '' },
    { title: 'Application', value: '' },
  ]);
  const [composition, setComposition] = useState([{ title: '', value: '' }]);
  // const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (!res.ok) {
        push('/login');
      }
    };
    verify();
    // console.log(file);
    // console.log('submitted');

    setLoading(true);

    const data = {
      productName: name,
      type,
      subject,
      description: descriptions,
      compostiion: composition,
      precautions,
      details,
      packing,
      moa,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('image', file);
    // console.log('debug');
    const res = await fetch('/api/products/addProduct/', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast('Product Uploaded Successfully!!!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
      });
      window.location.assign('/dashboard');
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast('Error Occured!!!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 p-6 h-[100vh]">
      <ToastContainer />
      <div className="overflow-y-scroll h-full w-full md:w-max rounded-lg shadow-lg">
        <div className="p-6  h-max min-w-full md:min-w-[30rem] bg-white  flex flex-col gap-5 overflow-auto">
          <div className="">
            <h1 className="font-bold text-center text-xl">Add New Product</h1>
            <hr />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="formLabels">Product Info</h2>
            <input
              type="text"
              id="pName"
              placeholder="Product name *"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              id="pSub"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Product subject"
            />
            <div className="flex items-center justify-between gap-4">
              <h1>Product Type* :</h1>
              <select
                name="type"
                id=""
                required
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 bg-gray-200 outline outline-[0.5px] outline-gray-400 text-black rounded-lg cursor-pointer flex-1"
              >
                {/* <option>Select Type</option> */}
                <option value="agri">Agri</option>
                <option value="aqua">Aqua</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <h1>Product Packing :</h1>
              <input
                type="text"
                id="pPacking"
                placeholder="Product Package Details"
                className="flex-1"
                onChange={(e) => setPacking(e.target.value)}
              />
            </div>
            <div
              className={`${
                !fileSelected ? 'hidden' : 'block'
              } flex items-center justify-between mb-4`}
            >
              <input
                type="file"
                id="pImage"
                required
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length === 0) {
                    setFileSelected(false);
                  }
                  setFile(e.target.files[0]);
                  setFileSelected(true);
                }}
              />
              <button
                type="button"
                className="p-4 rounded-full hover:bg-blue-100 transition-all"
                onClick={() => setFileSelected(false)}
              >
                <Image
                  src="/icons/delete.svg"
                  alt="X"
                  height={20}
                  width={20}
                  className="hover:scale-125 transition-all"
                />
              </button>
            </div>
            <label
              htmlFor="pImage"
              className={`${
                fileSelected ? 'hidden' : 'block'
              } flex items-center gap-4 mb-4`}
            >
              <h1>Product Image :</h1>
              <span className="label ">+ Upload Image</span>
            </label>

            <h2 className="formLabels">Product Description</h2>
            <div className="flex flex-col gap-1">
              {descriptions.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  placeholder="Add Product Description"
                  onChange={(e) => {
                    const newDescriptions = [...descriptions];
                    newDescriptions[index] = e.target.value;
                    setDescriptions(newDescriptions);
                  }}
                  className="block mb-2 p-2 border border-gray-300"
                />
              ))}
              <button
                type="button"
                className="addBtn"
                onClick={(e) => {
                  setDescriptions([...descriptions, '']);
                }}
              >
                <h2 className="text-sm">+ Add more</h2>
              </button>
            </div>

            <h2 className="formLabels">Product Benefits</h2>
            <div className="flex flex-col gap-1">
              {benefits.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  rows={2}
                  placeholder="Add Product Benefits"
                  onChange={(e) => {
                    const newBenefits = [...benefits];
                    newBenefits[index] = e.target.value;
                    setBenefits(newBenefits);
                  }}
                  className="block mb-2 p-2 border border-gray-300"
                />
              ))}
              <button
                type="button"
                className="addBtn"
                onClick={(e) => {
                  setBenefits([...benefits, '']);
                }}
              >
                <h2 className="text-sm">+ Add more</h2>
              </button>
            </div>

            <h2 className="formLabels">Mode of Application</h2>
            <div className="flex flex-col gap-1">
              {moa.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  rows={1}
                  placeholder="Add Mode of Application"
                  onChange={(e) => {
                    const newMoa = [...moa];
                    newMoa[index] = e.target.value;
                    setMoa(newMoa);
                  }}
                  className="block mb-2 p-2 border border-gray-300"
                />
              ))}
              <button
                type="button"
                className="addBtn"
                onClick={(e) => {
                  setMoa([...moa, '']);
                }}
              >
                <h2 className="text-sm">+ Add more</h2>
              </button>
            </div>

            <h2 className="formLabels">Dosage</h2>
            <input
              type="text"
              placeholder="Enter Product Dosage"
              id="dosage"
              onChange={(e) => {
                const newDetails = [...details];
                newDetails[0].value = e.target.value;
                setDetails(newDetails);
              }}
            />

            <h2 className="formLabels">Application</h2>
            <textArea
              type="text"
              placeholder="Enter Product Application"
              id="application"
              rows={2}
              onChange={(e) => {
                const newDetails = [...details];
                newDetails[1].value = e.target.value;
                setDetails(newDetails);
              }}
            />

            <h2 className="formLabels">Composition</h2>
            <div className="flex flex-col gap-1">
              {composition.map((text, index) => (
                <div key={index} className="grid grid-cols-2 gap-1 compNode">
                  <input
                    type="text"
                    placeholder="title"
                    onChange={(e) => {
                      const newComposition = [...composition];
                      newComposition[index].title = e.target.value;
                      setComposition(newComposition);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="value"
                    onChange={(e) => {
                      const newComposition = [...composition];
                      newComposition[index].value = e.target.value;
                      setComposition(newComposition);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="addBtn"
                onClick={(e) => {
                  // console.log(composition);
                  setComposition([...composition, { title: '', value: '' }]);
                }}
              >
                <h2 className="text-sm">+ Add more</h2>
              </button>
            </div>

            <h2 className="formLabels">Precautions</h2>
            <div className="flex flex-col gap-1">
              {precautions.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  rows={1}
                  placeholder="Add Product Precaution"
                  onChange={(e) => {
                    const newPrecautions = [...precautions];
                    newPrecautions[index] = e.target.value;
                    setPrecautions(newPrecautions);
                  }}
                  className="block mb-2 p-2 border border-gray-300"
                />
              ))}
              <button
                type="button"
                className="addBtn"
                onClick={(e) => {
                  setPrecautions([...precautions, '']);
                }}
              >
                <h2 className="text-sm">+ Add more</h2>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center">
                <CircularProgress />
              </div>
            ) : (
              <input type="submit" value="Submit" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
