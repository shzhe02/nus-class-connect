import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from '@/constants/routes';

import Homepage from '@/pages/Home/Homepage';
import SignUp from '@/pages/SignUp/SignUp';

const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.homepage} element={<Homepage />} />
        <Route path={routes.signup} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
