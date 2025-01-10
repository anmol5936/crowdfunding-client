import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, Payment, LandingPage } from './pages';
import PageNotFound from './pages/404';
import ScreenLoader from './components/ScreenLoader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const DefaultLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ScreenLoader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-dark">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2320_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2320_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main content */}
      <div className="relative sm:-8 p-4 min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { loading } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || initialLoading) {
    return <ScreenLoader />;
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <CreateCampaign />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign-details/:id"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <CampaignDetails />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Payment />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;