import React from 'react';
import { Hexagon, Triangle, Circle, Hash } from 'lucide-react';

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-epilogue">
      {/* Matrix-like background animation */}
      <div className="absolute inset-0 bg-[#13131a] ">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[#8247e5] text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 5 + 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '0' : '1'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Content wrapper with fade-in animation */}
      <div className="relative h-full flex items-center justify-center opacity-0 animate-fadeIn animation-delay-300">
        {/* Blockchain network effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="relative">
                <Hash className="w-4 h-4 text-[#8247e5]/20" />
                <div className="absolute w-20 h-[1px] bg-gradient-to-r from-[#8247e5]/0 via-[#8247e5]/20 to-[#8247e5]/0 transform rotate-45" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#13131a]/80 to-[#13131a]" />
        
        {/* Loader content */}
        <div className="relative">
          {/* Outer glow with blockchain pattern */}
          <div className="absolute -inset-24 opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-[#8247e5]/20 rounded-lg"
                style={{
                  transform: `rotate(${i * 60}deg)`,
                  animation: `spin ${8 + i}s linear infinite`
                }}
              />
            ))}
          </div>
          
          {/* Geometric shapes layer */}
          <div className="relative">
            {/* Data blocks */}
            <div className="absolute -inset-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `rotate(${i * 90}deg) translateX(4rem)`,
                  }}
                >
                  <div className="w-4 h-4 border border-[#8247e5]/30 rounded animate-pulse" 
                       style={{ animationDelay: `${i * 0.2}s` }} />
                </div>
              ))}
            </div>
            
            {/* Hexagon stack */}
            <div className="relative">
              {/* Circuit pattern */}
              <div className="absolute -inset-12 animate-[spin_20s_linear_infinite]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full"
                    style={{ transform: `rotate(${i * 120}deg)` }}
                  >
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-[#8247e5]/0 via-[#8247e5]/20 to-[#8247e5]/0" />
                  </div>
                ))}
              </div>
              
              {/* Rotating hexagons */}
              <div className="relative">
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                  <Hexagon className="w-24 h-24 text-[#8247e5]/20 stroke-[1]" />
                </div>
                <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                  <Hexagon className="w-24 h-24 text-[#8247e5]/40 stroke-[1]" />
                </div>
                <div className="animate-[spin_2s_linear_infinite]">
                  <Hexagon className="w-24 h-24 text-[#8247e5] stroke-[1]" />
                </div>
                
                {/* Center core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Digital core */}
                    <div className="relative">
                      <div className="w-4 h-4 bg-[#8247e5] rounded animate-pulse" />
                      <div className="absolute inset-0 bg-[#8247e5]/50 rounded blur-md animate-pulse" />
                    </div>
                    {/* Data transmission rings */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-[#8247e5]/30"
                        style={{
                          inset: `-${(i + 1) * 4}px`,
                          animation: `ping ${2 + i * 0.5}s cubic-bezier(0,0,0.2,1) infinite`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;