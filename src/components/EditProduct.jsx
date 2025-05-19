import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import toastify from '@/utils/toast';
import { ToastContainer } from 'react-toastify';

const EditProduct = ({ id, setEditModal }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      await fetch(`/api/products/${id}?type=id`)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res?.products[0]);
          if (product?.productImage) {
            setFileSelected(true);
          }
        });
      setLoading(false);
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    if (product?.productImage) {
      setFileSelected(true);
    } else setFileSelected(false);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof product?.productImage === 'object') {
      const data = new FormData();
      data.append('data', JSON.stringify(product));
      data.append('productImage', product?.productImage);
      await fetch(`/api/products/${product._id}?dataType=formData`, {
        method: 'PATCH',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.success) {
            toastify('success', 'Updated Successfully');
            setTimeout(() => setEditModal(false), 2000);
            // setEditModal(false);
          } else {
            toastify('error', 'Update Unsuccessful');
          }
        });
    } else {
      await fetch(`/api/products/${product._id}?dataType=json`, {
        method: 'PATCH',
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.success) {
            toastify('success', 'Updated Successfully');
            setTimeout(() => setEditModal(false), 2000);
          } else {
            toastify('error', 'Update Unsuccessful');
          }
        });
    }
  };
  return (
    <div className="overflow-y-hidden  absolute flex justify-center items-center inset-0 h-screen w-full bg-black/50 z-10">
      <ToastContainer />
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {product && (
        <div className="flex items-center justify-center  p-6 h-[100vh]">
          <div className="overflow-y-scroll h-full w-full md:w-max rounded-lg shadow-lg">
            <div className="p-6  h-max min-w-full md:min-w-[40rem] bg-white  flex flex-col gap-5 overflow-auto">
              <div className="">
                <h1 className="font-bold text-center text-xl">
                  update Product
                </h1>
                <hr />
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="formLabels">Product Info</h2>
                <input
                  type="text"
                  id="pName"
                  placeholder="Product name *"
                  required
                  value={product?.productName}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  id="pSub"
                  value={product?.subTitle}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      subTitle: e.target.value,
                    }))
                  }
                  placeholder="Product subject"
                />
                <div className="flex items-center justify-between gap-4">
                  <h1>Product Type* :</h1>
                  <select
                    name="type"
                    id=""
                    required
                    value={product?.type}
                    onChange={(e) =>
                      setProduct((prev) => ({ ...prev, type: e.target.value }))
                    }
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
                    value={product?.packing}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        packing: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* START OF FILE IMAGE PART */}
                {/* FILESELECTED -> file is present either from db(str) or selected by user */}
                <div
                  className={`${
                    !fileSelected ? 'hidden' : 'block'
                  } flex items-center justify-between mb-4`}
                >
                  {typeof product?.productImage === 'string' ? (
                    <div className="flex justify-between w-full items-center">
                      {/* FILE FROM DB AS STRING */}
                      <h1>ProductImage:</h1>
                      <div className="flex gap-2 items-center">
                        <h1>{product?.productImage}</h1>

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
                    </div>
                  ) : (
                    <>
                      <h1>ProductImage:</h1>
                      <div className="flex gap-2 items-center">
                        <h1>{product?.productImage?.name}</h1>
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
                    </>
                  )}
                </div>

                {/* THIS IS TO UPLOAD IMAGE */}
                {!fileSelected && (
                  <input
                    type="file"
                    id="pImage"
                    required
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length === 0) {
                        setFileSelected(false);
                      }
                      setProduct((prev) => ({
                        ...prev,
                        productImage: e.target.files[0],
                      }));
                      setFileSelected(true);
                    }}
                    hidden
                  />
                )}
                <label
                  htmlFor="pImage"
                  className={`${
                    fileSelected ? 'hidden' : 'block'
                  } flex items-center gap-4 mb-4`}
                >
                  <h1>Product Image :</h1>
                  <span className="label ">+ Upload Image</span>
                </label>

                {/* END OF FILE IAMGE SECTION */}
                <h2 className="formLabels">Product Description</h2>
                <div className="flex flex-col gap-1">
                  {product?.description?.map((text, index) => (
                    <textarea
                      key={index}
                      value={product?.description[index]}
                      placeholder="Add Product Description"
                      rows={4}
                      onChange={(e) => {
                        const newDescriptions = [...product?.description];
                        newDescriptions[index] = e.target.value;
                        setProduct((prev) => ({
                          ...prev,
                          description: newDescriptions,
                        }));
                      }}
                      className="block mb-2 p-2 border border-gray-300"
                    />
                  ))}
                  <button
                    type="button"
                    className="addBtn"
                    onClick={(e) => {
                      const newDescriptions = [...product?.description, ''];
                      setProduct((prev) => ({
                        ...prev,
                        description: newDescriptions,
                      }));
                    }}
                  >
                    <h2 className="text-sm">+ Add more</h2>
                  </button>
                </div>

                <h2 className="formLabels">Product Benefits</h2>
                <div className="flex flex-col gap-1">
                  {product?.benefits.map((text, index) => (
                    <textarea
                      key={index}
                      rows={2}
                      placeholder="Add Product Benefits"
                      value={product?.benefits[index]}
                      onChange={(e) => {
                        const newBenefits = [...product?.benefits];
                        newBenefits[index] = e.target.value;
                        setProduct((prev) => ({
                          ...prev,
                          benefits: newBenefits,
                        }));
                      }}
                      className="block mb-2 p-2 border border-gray-300"
                    />
                  ))}
                  <button
                    type="button"
                    className="addBtn"
                    onClick={(e) => {
                      const newBenefits = [...product?.benefits, ''];
                      setProduct((prev) => ({
                        ...prev,
                        benefits: newBenefits,
                      }));
                    }}
                  >
                    <h2 className="text-sm">+ Add more</h2>
                  </button>
                </div>

                <h2 className="formLabels">Mode of Application</h2>
                <div className="flex flex-col gap-1">
                  {product?.moa.map((text, index) => (
                    <textarea
                      key={index}
                      value={product?.moa[index]}
                      rows={2}
                      placeholder="Add Mode of Application"
                      onChange={(e) => {
                        const newMoa = [...product?.moa];
                        newMoa[index] = e.target.value;
                        setProduct((prev) => ({ ...prev, moa: newMoa }));
                      }}
                      className="block mb-2 p-2 border border-gray-300"
                    />
                  ))}
                  <button
                    type="button"
                    className="addBtn"
                    onClick={(e) => {
                      const newMoa = [...product?.moa, ''];
                      setProduct((prev) => ({ ...prev, moa: newMoa }));
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
                  value={product?.details[0]?.value}
                  onChange={(e) => {
                    const newDetails = [...product?.details];
                    newDetails[0].value = e.target.value;
                    setProduct((prev) => ({ ...prev, details: newDetails }));
                  }}
                />

                <h2 className="formLabels">Application</h2>
                <textarea
                  type="text"
                  placeholder="Enter Product Application"
                  id="application"
                  value={product?.details[1]?.value}
                  rows={2}
                  onChange={(e) => {
                    const newDetails = [...product?.details];
                    if (newDetails[1]) {
                      newDetails[1].value = e.target.value;
                    } else {
                      newDetails[1] = {
                        title: 'Application',
                        value: e.target.value,
                      };
                    }
                    setProduct((prev) => ({ ...prev, details: newDetails }));
                  }}
                />

                <h2 className="formLabels">Composition</h2>
                <div className="flex flex-col gap-1">
                  {product?.compostiion?.map((text, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-1 compNode"
                    >
                      <input
                        type="text"
                        placeholder="title"
                        value={product?.compostiion[index]?.title}
                        onChange={(e) => {
                          const newComposition = [...product?.compostiion];
                          newComposition[index].title = e.target.value;
                          setProduct((prev) => ({
                            ...prev,
                            compostiion: newComposition,
                          }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="value"
                        value={product?.compostiion[index]?.value}
                        onChange={(e) => {
                          const newComposition = [...product?.compostiion];
                          newComposition[index].title = e.target.value;
                          setProduct((prev) => ({
                            ...prev,
                            compostiion: newComposition,
                          }));
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addBtn"
                    onClick={(e) => {
                      // console.log(composition);
                      const newComposition = [
                        ...product?.compostiion,
                        { title: '', value: '' },
                      ];
                      setProduct((prev) => ({
                        ...prev,
                        compostiion: newComposition,
                      }));
                    }}
                  >
                    <h2 className="text-sm">+ Add more</h2>
                  </button>
                </div>

                <h2 className="formLabels">Precautions</h2>
                <div className="flex flex-col gap-1">
                  {product?.precautions.map((text, index) => (
                    <textarea
                      key={index}
                      value={product?.precautions[index]}
                      rows={2}
                      placeholder="Add Product Precaution"
                      onChange={(e) => {
                        const newPrecautions = [...product?.precautions];
                        newPrecautions[index] = e.target.value;
                        setProduct((prev) => ({
                          ...prev,
                          precautions: newPrecautions,
                        }));
                      }}
                      className="block mb-2 p-2 border border-gray-300"
                    />
                  ))}
                  <button
                    type="button"
                    className="addBtn"
                    onClick={(e) => {
                      const newPrecautions = [...product?.precautions, ''];
                      setProduct((prev) => ({
                        ...prev,
                        precautions: newPrecautions,
                      }));
                    }}
                  >
                    <h2 className="text-sm">+ Add more</h2>
                  </button>
                </div>
                <div className="flex gap-2 w-full justify-center">
                  <button
                    type="button"
                    className="px-4 py-2 bg-black text-white rounded-lg"
                    onClick={() => setEditModal(false)}
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress />
                    </div>
                  ) : (
                    <input type="submit" value="Submit" />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
