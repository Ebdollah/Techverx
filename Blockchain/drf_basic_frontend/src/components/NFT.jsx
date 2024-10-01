import React from 'react';
import { FiShield, FiTrendingUp, FiTarget, FiUser } from 'react-icons/fi';
import MintNFT from '../MintNFT';

const NFT = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <div className="flex mx-auto flex-wrap mb-20">
          <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
            <FiShield className="w-5 h-5 mr-3" />
            Mint NFT
          </a>
          <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
            <FiTrendingUp className="w-5 h-5 mr-3" />
            STEP 2
          </a>
          <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
            <FiTarget className="w-5 h-5 mr-3" />
            STEP 3
          </a>
          <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
            <FiUser className="w-5 h-5 mr-3" />
            STEP 4
          </a>
        </div>
        <MintNFT />
      </div>
    </section>
  );
};

export default NFT;
