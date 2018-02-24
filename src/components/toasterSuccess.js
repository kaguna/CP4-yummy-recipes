import React, { Component } from 'react';
import {ToastContainer} from 'react-toastify';
const Toaster = () => {
    return(
        <ToastContainer
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick
        />
    )
};
export default Toaster