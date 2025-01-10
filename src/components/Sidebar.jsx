import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useStateContext } from '../context';
import { navlinks } from '../constants';
import { thirdweb } from '../assets';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div 
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-white/10 backdrop-blur-sm'} flex justify-center items-center ${!disabled && 'cursor-pointer hover:bg-white/5'} ${styles}`} 
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale opacity-50'}`} />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { disconnect } = useStateContext();

  const handleLogout = async () => {
    await disconnect();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <div className="w-[52px] h-[52px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-[10px] flex items-center justify-center">
          <Icon styles="w-[32px] h-[32px]" imgUrl={thirdweb} />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-sm rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <button 
          onClick={handleLogout}
          className="w-[48px] h-[48px] rounded-[10px] bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-1/2 h-1/2 text-indigo-400" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;