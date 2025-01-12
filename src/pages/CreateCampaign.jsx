import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { uploadToPinata } from '../utils/pinata';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { publishCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    minimumContribution: '0.01',
    category: 'General'
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = form.image;
      
      if (selectedFile) {
        imageUrl = await uploadToPinata(selectedFile);
      }

      await publishCampaign({ 
        ...form,
        image: imageUrl,
        target: form.target,
        minimumContribution: form.minimumContribution
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during campaign creation:', error);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

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

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/5 rounded-full " />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/5 rounded-full " />
      </div>

      <div className="relative bg-[#1a1a23]/80 backdrop- flex justify-center items-center flex-col rounded-2xl border border-purple-500/10 ">
        {isLoading && <Loader />}
        
        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl transition-all duration-300" />
          <div className="relative flex justify-center items-center p-6 sm:min-w-[380px] bg-[#1e1e27] rounded-xl border border-purple-500/10">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Start a Campaign
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full mt-16 flex flex-col gap-8 p-8">
          <div className="flex flex-wrap gap-8">
            <FormField 
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange('name', e)}
            />
            <FormField 
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>

          <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl transition-all duration-300" />
            <div className="relative w-full flex justify-start items-center p-6 bg-[#1e1e27] rounded-xl border border-purple-500/10">
              <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
              <h4 className="font-epilogue font-bold text-[25px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-[20px]">
                You will get 100% of the raised amount
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <FormField 
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange('target', e)}
            />
            <FormField 
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </div>

          <div className="flex flex-wrap gap-8">
            <FormField 
              labelName="Minimum Contribution (ETH) *"
              placeholder="ETH 0.01"
              inputType="text"
              value={form.minimumContribution}
              handleChange={(e) => handleFormFieldChange('minimumContribution', e)}
            />
            <div className="flex-1">
              <label className="font-epilogue font-medium text-[14px] leading-[22px] text-gray-400 mb-[10px]">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => handleFormFieldChange('category', e)}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border border-purple-500/10 bg-[#1e1e27] font-epilogue text-white text-[14px] placeholder:text-gray-600 rounded-xl w-full focus:border-purple-500/30 transition-colors duration-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-[#1e1e27]">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormField 
            labelName="Campaign image *"
            placeholder="Upload campaign image"
            inputType="file"
            value=""
            handleChange={() => {}}
            handleFileChange={handleFileChange}
          />

          <div className="flex justify-center items-center mt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <CustomButton 
                btnType="submit"
                title="Submit new campaign"
                styles="relative bg-[#1e1e27] hover:bg-[#2a2a35] transition-all duration-200"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;