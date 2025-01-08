import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, Payment } from './pages';
import PageNotFound from './components/PageNotFound';
import ScreenLoader from './components/ScreenLoader';

const DefaultLayout = ({ children }) => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds on initial load and page reload
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <Routes>
        {/* Routes with default layout */}
        <Route element={<DefaultLayout><Home /></DefaultLayout>} path="/" />
        <Route element={<DefaultLayout><Profile /></DefaultLayout>} path="/profile" />
        <Route element={<DefaultLayout><CreateCampaign /></DefaultLayout>} path="/create-campaign" />
        <Route element={<DefaultLayout><CampaignDetails /></DefaultLayout>} path="/campaign-details/:id" />
        <Route element={<DefaultLayout><Payment /></DefaultLayout>} path="/payment" />
        
        {/* 404 page without default layout */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;