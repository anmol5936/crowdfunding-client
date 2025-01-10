import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Blocks } from 'lucide-react';
import BlockchainBackground from '../components/BlockchainBackground';

const LandingPage = () => {
  const { signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      const popupTest = window.open('', '_blank');
      if (!popupTest || popupTest.closed || typeof popupTest.closed === 'undefined') {
        setError('Please enable popups for this site to sign in with Google');
        return;
      }
      popupTest.close();

      const user = await signInWithGoogle();
      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      if (error instanceof Error) {
        if (error.message.includes('popup-blocked')) {
          setError('Please enable popups for this site to sign in with Google');
        } else if (error.message.includes('cancelled-popup-request')) {
          setError('Sign in was cancelled. Please try again.');
        } else {
          setError('Failed to sign in. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a23] to-[#13131a] overflow-hidden">
      <BlockchainBackground />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2320_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2320_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container relative mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
          <div className="w-full max-w-7xl mx-auto mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl animate-pulse" />
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
                <Blocks className="w-20 h-20 text-purple-400 relative animate-float" />
              </div>
            </div>
            
            <h1 className="text-[8rem] md:text-[12rem] font-black text-center tracking-tighter leading-none relative">
              <span className="relative block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
                NEXUS
              </span>
            </h1>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-xl" />
              <p className="text-3xl md:text-4xl font-light text-center mt-6 bg-gradient-to-r from-purple-200 to-pink-200 text-transparent bg-clip-text tracking-wide relative">
                Decentralized Crowdfunding
              </p>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-500 rounded-lg max-w-md text-center">
              {error}
            </div>
          )}

          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-xl" />
            <p className="text-xl md:text-2xl text-center text-gray-300 max-w-3xl relative leading-relaxed">
              Join the future of fundraising with our blockchain-based crowdfunding platform.
            </p>
          </div>
          
          {!user ? (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="relative flex items-center justify-center space-x-4 bg-[#1e1e27] text-white px-12 py-4 rounded-lg font-medium hover:bg-[#2a2a35] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-[1.02]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <div className="relative w-6 h-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                      <svg className="relative" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <span className="relative z-10 text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                      Continue with Google
                    </span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <button
                onClick={() => navigate('/dashboard')}
                className="relative flex items-center justify-center space-x-4 bg-[#1e1e27] text-white px-12 py-4 rounded-lg font-medium hover:bg-[#2a2a35] transition-all duration-300 group-hover:scale-[1.02]"
              >
                <span className="relative z-10 text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                  Go to Dashboard
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;