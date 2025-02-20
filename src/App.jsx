import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CounterContextProvider from './components/context/CounterContext';
import Layout from './components/layout/layot';  
import Home from './components/Home/Home';
import NotFounded from './components/NotFounded/NotFounded';
import CustomersGraph from './components/CustomersGraph/CustomersGraph';
import Contact from './components/Contact/Contact';

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'contact', element: <Contact /> },
        { path: '/customersGraph/:id', element: <CustomersGraph /> },
        { path: '*', element: <NotFounded /> }
      ]
    }
  ]);

  return (

    
    <CounterContextProvider>
      <RouterProvider router={router} />
    </CounterContextProvider>
  );
};

export default App;
