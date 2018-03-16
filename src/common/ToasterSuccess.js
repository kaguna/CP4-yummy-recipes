import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toaster = () => (
  <ToastContainer
    position="top-right"
    type="default"
    autoClose={5000}
    hideProgressBar={true}
    closeOnClick
  />
);
export default Toaster;
