import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Binary, Network } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="binary-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="binary-column"
              style={{ 
                left: `${i * 5}%`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              01
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-xl w-full">
        {/* Main container with glass effect */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8 shadow-2xl">
          {/* Error Code */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 font-mono text-sm">ERROR::BLOCK_NOT_FOUND</span>
            </div>
            <span className="text-white/50 font-mono text-sm">0x404</span>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-light text-white">
                Block <span className="text-blue-400">Not Found</span>
              </h1>
              <Network className="text-blue-400 w-8 h-8" />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Transaction Details */}
            <div className="space-y-4 font-mono text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-white/60">Network Status</div>
                <div className="text-white flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Connected
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-white/60">Last Sync</div>
                <div className="text-white">{new Date().toISOString()}</div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/')}
              className="w-full mt-8 bg-blue-500/10 border border-blue-400/20 text-blue-400 py-3 px-6 rounded-lg
                       transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/40
                       flex items-center justify-center space-x-2 group"
            >
              <Binary className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>Return to Main Chain</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <style jsx>{`
        .binary-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color: #0066ff;
          font-family: monospace;
        }

        .binary-column {
          position: absolute;
          top: -20px;
          font-size: 12px;
          line-height: 1;
          white-space: nowrap;
          animation: rain 20s linear infinite;
          opacity: 0.5;
        }

        @keyframes rain {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;