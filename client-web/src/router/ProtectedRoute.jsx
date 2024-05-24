// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  // console.log({ accessToken: localStorage.getItem('accessToken') });
  // if (!localStorage.getItem('accessToken')) {
  //   return <Navigate to='/login' />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
