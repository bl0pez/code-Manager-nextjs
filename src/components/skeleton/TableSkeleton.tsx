import React from "react";

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse h-80">
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 py-1 bg-gray-300 rounded"></div>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 mt-2">
          {[...Array(5)].map((_, j) => (
            <div key={j} className="flex-1 py-1 bg-gray-300 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
};
