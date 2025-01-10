import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, getCampaignStats, closeCampaign, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [campaignStats, setCampaignStats] = useState(null);

  // Redirect if no campaign data
  useEffect(() => {
    if (!state) {
      navigate('/dashboard');
      return;
    }
  }, [state, navigate]);

  // Early return if no campaign data
  if (!state) {
    return null;
  }

  const remainingDays = daysLeft(state.deadline);
  const isOwner = state.owner.toLowerCase() === address?.toLowerCase();

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  const fetchCampaignStats = async () => {
    const stats = await getCampaignStats(state.pId);
    setCampaignStats(stats);
  }

  useEffect(() => {
    if(contract) {
      fetchDonators();
      fetchCampaignStats();
    }
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    try {
      if (parseFloat(amount) < parseFloat(state.minimumContribution)) {
        alert(`Minimum contribution is ${state.minimumContribution} ETH`);
        return;
      }
      await donate(state.pId, amount);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error donating:", error);
      alert("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseCampaign = async () => {
    setIsLoading(true);
    try {
      await closeCampaign(state.pId);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error closing campaign:", error);
      alert("Failed to close campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const showFundingSection = campaignStats?.isActive && 
                            !campaignStats?.targetReached && 
                            !isOwner;

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {isLoading && <Loader />}

      <div className="relative bg-[#1e1e27]/80 backdrop-blur-xl rounded-2xl border border-purple-500/10 shadow-xl p-6">
        <div className="w-full flex md:flex-row flex-col gap-8">
          <div className="flex-1">
            <div className="relative group rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e27] to-transparent opacity-50" />
              <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover"/>
            </div>
            <div className="relative w-full h-2 bg-[#1a1a23] mt-4 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ 
                  width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                  maxWidth: '100%'
                }}
              />
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-6">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Creator Section */}
            <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10">
              <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Creator</h4>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1e1e27] border border-purple-500/10">
                  <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-white break-all">{state.owner}</h4>
                  <p className="font-epilogue text-sm text-gray-400">Campaign Creator</p>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10">
              <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Campaign Details</h4>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <p className="font-epilogue text-gray-400">Category</p>
                  <p className="font-epilogue text-white">{state.category}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-epilogue text-gray-400">Minimum Contribution</p>
                  <p className="font-epilogue text-white">{state.minimumContribution} ETH</p>
                </div>
                {campaignStats && (
                  <>
                    <div className="flex justify-between">
                      <p className="font-epilogue text-gray-400">Average Donation</p>
                      <p className="font-epilogue text-white">{campaignStats.averageDonation} ETH</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-epilogue text-gray-400">Status</p>
                      <p className="font-epilogue text-white">
                        {campaignStats.targetReached ? 'Target Reached' : campaignStats.isActive ? 'Active' : 'Closed'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10">
              <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Story</h4>
              <p className="mt-4 font-epilogue text-gray-400 leading-relaxed">{state.description}</p>
            </div>

            {/* Donators Section */}
            <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10">
              <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Donators</h4>
              <div className="mt-4 space-y-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue text-white break-all">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue text-gray-400">{item.donation} ETH</p>
                  </div>
                )) : (
                  <p className="font-epilogue text-gray-400">No donators yet. Be the first one!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Fund or Manage Campaign */}
          <div className="lg:col-span-1">
            {showFundingSection ? (
              <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10 sticky top-6">
                <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Fund Campaign</h4>
                <div className="mt-6 space-y-6">
                  <input 
                    type="number"
                    placeholder={`ETH ${state.minimumContribution} (min)`}
                    step="0.01"
                    className="w-full p-4 rounded-xl bg-[#1e1e27] text-white border border-purple-500/10 focus:border-purple-500/30 transition-colors outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <div className="p-4 bg-[#1e1e27] rounded-xl border border-purple-500/10">
                    <h4 className="font-epilogue font-semibold text-white">Back it because you believe in it.</h4>
                    <p className="mt-2 font-epilogue text-gray-400">Support the project for no reward, just because it speaks to you.</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-200" />
                    <CustomButton 
                      btnType="button"
                      title="Fund Campaign"
                      styles="relative w-full bg-[#1e1e27] hover:bg-[#2a2a35] transition-all duration-200"
                      handleClick={handleDonate}
                    />
                  </div>
                </div>
              </div>
            ) : isOwner && campaignStats?.isActive && !campaignStats?.targetReached && (
              <div className="bg-[#1a1a23] rounded-xl p-6 border border-purple-500/10 sticky top-6">
                <h4 className="font-epilogue font-semibold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Campaign Management</h4>
                <div className="mt-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-200" />
                    <CustomButton 
                      btnType="button"
                      title="Close Campaign"
                      styles="relative w-full bg-[#1e1e27] hover:bg-[#2a2a35] transition-all duration-200"
                      handleClick={handleCloseCampaign}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;