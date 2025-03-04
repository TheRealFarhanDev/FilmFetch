import React from 'react';

const SkeletonMovieInfo = () => {
  return (
    <div className="bg-[#030014] min-h-screen text-white flex justify-center items-start">
      <div className="min-w-[90%] mx-12 my-7 sm:my-14 sm:mx-24 bg-[#0F0D23] rounded-xl h-auto flex flex-col md:flex-row shadow-[0px_12px_32px_0px_rgba(206,206,251,0.02)_inset,0px_0px_100px_0px_rgba(171,139,255,0.30)] ring-1 ring-white/20 p-6 md:p-12">
        
        {/* Skeleton Image Placeholder */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:w-[500px] h-[300px] md:h-[450px] bg-gray-700 animate-pulse rounded-lg"></div>
        </div>

        {/* Skeleton Info Section */}
        <div className="w-full flex flex-col gap-4 mt-6 md:mt-0 md:pl-6">
          <div className="h-8 w-3/4 bg-gray-700 animate-pulse rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded-md"></div>
          
          {/* Skeleton Genres */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-6 w-20 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-6 w-14 bg-gray-700 animate-pulse rounded-md"></div>
          </div>

          {/* Skeleton Overview */}
          <div className="h-16 w-full bg-gray-700 animate-pulse rounded-md"></div>

          {/* Skeleton Metadata */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-4 w-40 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-4 w-28 bg-gray-700 animate-pulse rounded-md"></div>
          </div>

          {/* Skeleton Button */}
          <div className="h-10 w-36 bg-gray-700 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMovieInfo;
