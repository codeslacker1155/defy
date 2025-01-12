import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import type { NFT } from '../types/nft';

interface NFTCardProps {
  nft: NFT;
}

function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative group">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{nft.name}</h3>
            <p className="text-sm text-gray-600">by {nft.designer}</p>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{nft.description}</p>

        <div className="pt-2 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="font-semibold text-lg">{nft.price} SOL</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;