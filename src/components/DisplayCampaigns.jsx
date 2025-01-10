import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';

const DisplayCampaigns = ({ 
  title, 
  isLoading, 
  campaigns,
  filters,
  onFilterChange
}) => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  const categories = [
    'General',
    'Technology',
    'Healthcare',
    'Education',
    'Environment',
    'Community',
    'Creative',
    'Business',
    'Charity',
    'Other'
  ];




  useEffect(() => {
    let result = [...campaigns];

    if (filters.category !== 'all') {
      result = result.filter(campaign => 
        campaign.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(campaign => {
        if (filters.status === 'active') return campaign.isActive && !campaign.targetReached;
        return !campaign.isActive || campaign.targetReached;
      });
    }

    setFilteredCampaigns(result);
  }, [campaigns, filters]);

  const handleCardClick = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, {
      state: campaign
    });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Main Header with gradient text */}
      <div className="mb-8">
        <h1 className="font-epilogue font-bold text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          {title}
        </h1>
        <p className="text-gray-400">
          {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex justify-start">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative group flex items-center justify-center gap-2 px-6 py-3 bg-[#1e1e27] rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Filter className={`w-5 h-5 ${showFilters ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="text-white font-epilogue">Filters</span>
            </button>

            {showFilters && (
              <div className="absolute mt-2 w-72 p-4 bg-[#1e1e27] rounded-xl shadow-xl z-10 border border-purple-500/10 backdrop-blur-xl">
                <div className="space-y-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-gray-400 font-epilogue text-sm block mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => onFilterChange('category', e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#1a1a23] text-white border border-purple-500/10 focus:outline-none focus:border-purple-500/30 transition-colors"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category.toLowerCase()} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="text-gray-400 font-epilogue text-sm block mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => onFilterChange('status', e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#1a1a23] text-white border border-purple-500/10 focus:outline-none focus:border-purple-500/30 transition-colors"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full flex justify-center items-center py-12">
            <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
          </div>
        )}

        {!isLoading && filteredCampaigns.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="font-epilogue font-semibold text-gray-400 text-lg">
              No campaigns found
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to find what you're looking for
            </p>
          </div>
        )}

        {!isLoading && filteredCampaigns.length > 0 && filteredCampaigns.map((campaign) => (
          <FundCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleCardClick(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;