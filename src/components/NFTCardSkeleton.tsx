import React from 'react';

function NFTCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-64 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded" />
        </div>
        <div className="h-12 w-full bg-gray-200 rounded" />
        <div className="pt-2 flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default NFTCardSkeleton;
