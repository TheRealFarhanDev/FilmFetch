import React from 'react'

const SkeletonCard = React.memo(() => {
    return (
        <div className="bg-gray-700 rounded-lg overflow-hidden animate-pulse w-full h-full">
            <div className="w-full h-[350px] bg-gray-600"></div>
            <div className="p-4">
                <div className="w-3/4 h-4 bg-gray-600 mb-2 rounded-lg"></div>
                <div className="w-1/2 h-3 bg-gray-600 rounded-lg"></div>
            </div>
        </div>
    )
})

export default SkeletonCard
