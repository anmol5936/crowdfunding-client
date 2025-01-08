import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Blocks, Binary, Shield, Database, Cpu, HardDrive, Server } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#13131a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated blockchain grid background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-10">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className={`flex items-center justify-center animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}>
            {i % 4 === 0 && <Database className="w-8 h-8 text-[#4acd8d]" />}
            {i % 4 === 1 && <Cpu className="w-8 h-8 text-[#4acd8d]" />}
            {i % 4 === 2 && <HardDrive className="w-8 h-8 text-[#4acd8d]" />}
            {i % 4 === 3 && <Server className="w-8 h-8 text-[#4acd8d]" />}
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="bg-[#1c1c24] p-12 rounded-2xl max-w-2xl w-full relative">
        {/* Enhanced glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4acd8d] via-[#2d8b5c] to-[#4acd8d] opacity-20 blur-lg animate-pulse" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Enhanced 404 Display */}
          <div className="flex justify-center mb-12 relative">
            <div className="relative">
              {/* Hexagonal Background */}
              <div className="w-40 h-40 bg-[#2c2f32] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4acd8d]/20 to-transparent" />
              </div>
              
              {/* Rotating Border Effect */}
              <div className="absolute inset-[-2px] rounded-full border-2 border-[#4acd8d]/30 animate-spin-slow" />
              
              {/* 404 Text */}
              <div className="relative z-10 flex flex-col items-center justify-center p-8">
                <h1 className="text-[#4acd8d] font-epilogue text-8xl font-bold mb-2 relative text-shadow-glow">
                  404
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4acd8d] to-transparent" />
              </div>
            </div>
          </div>

          {/* Enhanced Title and Description */}
          <div className="text-center mb-12">
            <h2 className="text-white font-epilogue text-3xl font-bold mb-4 text-shadow-glow">
              Block Not Found
            </h2>
            
            <p className="text-[#d6d7e0] font-epilogue text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              The smart contract you're looking for doesn't exist on this chain. 
              Please verify the contract address or return to the main network.
            </p>
          </div>

          {/* Enhanced Transaction Details */}
          <div className="bg-[#2c2f32] rounded-xl p-6 mb-8 backdrop-blur-sm border border-[#4acd8d]/20">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-[#808191] font-epilogue text-sm block">Transaction Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-500 font-epilogue text-lg font-semibold">Failed</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[#808191] font-epilogue text-sm block">Error Code</span>
                <span className="text-[#4acd8d] font-epilogue text-lg font-mono font-semibold">0x404</span>
              </div>
            </div>
          </div>

          {/* Enhanced Return Button */}
          <button
            onClick={() => navigate('/')}
            className="relative group bg-gradient-to-r from-[#4acd8d] to-[#2d8b5c] text-white font-epilogue py-5 px-8 rounded-xl flex items-center justify-center gap-3 w-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4acd8d]/20 overflow-hidden"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <Home className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-lg font-semibold">Return to Main Network</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(74, 205, 141, 0.5),
                       0 0 20px rgba(74, 205, 141, 0.3),
                       0 0 30px rgba(74, 205, 141, 0.2);
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;