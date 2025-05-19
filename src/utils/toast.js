import { toast, Slide } from 'react-toastify';

const toastify = (type, message) => {
  return toast(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
    theme: 'light',
    transition: Slide,
  });
};

export default toastify;
