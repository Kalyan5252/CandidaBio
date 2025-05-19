import React from 'react';
import toastify from '@/utils/toast';
import { ToastContainer, Bounce } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import Loader from './Loader';

const DeleteModal = ({ productTitle, deleteId, setDeleteModal }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await fetch(`/api/products/${deleteId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toastify('success', 'Deleted successfully');
        } else {
          toastify('error', 'Delete Unsuccessful');
        }
      })
      .catch(() => toastify('error', 'Error!Try Again Later'));
    setIsLoading(false);
    setTimeout(() => window.location.reload(), 2000);
  };

  return (
    <div className="overflow-y-hidden  absolute flex justify-center items-center inset-0 h-screen w-full bg-black/50 z-10">
      <div className="bg-white p-4 h-2/5 w-2/5 rounded-lg flex flex-col gap-3 justify-center items-center">
        <div className="border-2 p-2 rounded-full text-red-500 border-red-500">
          <RxCross2 size={40} />
        </div>
        <h1 className="font-medium text-lg">Are you sure ?</h1>
        <p className="max-w-[35ch] ">
          Do you really want to delete the product{' '}
          <span className="font-bold">{productTitle}</span>? This process cannot
          be undone.
        </p>
        <div className="flex gap-3 ">
          <button
            className="hover:shadow-md transition-all bg-gray-300 rounded-lg px-4 py-2"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          {isLoading ? (
            <Loader />
          ) : (
            <button
              className="text-white hover:shadow-md transition-all bg-red-500 rounded-lg px-4 py-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteModal;
