import React from 'react';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { useAuth } from '../context/AuthContext';




const FundCard = ({ owner, title, description, target, deadline, amountCollected, category, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  const { user } = useAuth();
  return (
    <div 
      onClick={handleClick}
      className="group relative w-full rounded-xl cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300" />
      
      {/* Card content */}
      <div className="relative bg-[#1e1e27] rounded-xl border border-purple-500/10">
        {/* Image container with gradient overlay */}
        <div className="relative h-[158px] rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e27] to-transparent opacity-50" />
          <img src={image} alt="fund" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col p-4">
          {/* Category tag */}
          <div className="flex flex-row items-center mb-4">
            <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
            <p className="ml-3 font-epilogue font-medium text-sm text-gray-400">{category}</p>
          </div>

          {/* Title and description */}
          <div className="block mb-4">
            <h3 className="font-epilogue font-semibold text-lg text-white leading-tight truncate">
              {title}
            </h3>
            <p className="mt-2 font-epilogue text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-base text-purple-400">
                {amountCollected}
              </h4>
              <p className="mt-1 font-epilogue text-sm text-gray-400">
                Raised of {target}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <h4 className="font-epilogue font-semibold text-base text-pink-400">
                {remainingDays}
              </h4>
              <p className="mt-1 font-epilogue text-sm text-gray-400">
                Days Left
              </p>
            </div>
          </div>

          {/* Creator info */}
          <div className="flex items-center gap-3 pt-4 border-t border-purple-500/10">
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-[#1a1a23] border border-purple-500/10">
            {user?.photoURL ? (
              <img src={user?.photoURL} alt="user" className=" rounded-full object-contain"/>
            ) : (
              <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
            )}
            </div>
            <p className="flex-1 font-epilogue text-sm text-gray-400 truncate">
              by <span className="text-white">{user?.displayName || {owner}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundCard;