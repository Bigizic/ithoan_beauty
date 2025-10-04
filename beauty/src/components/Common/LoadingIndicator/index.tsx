import React from "react";

export const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#e6e1c9] border-t-[#eabe30] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#eabe30] rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const FullPageLoadingIndicator = () => {
  return (
    <div className="fixed inset-0 bg-[#e6e1c9]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#e6e1c9] border-t-[#eabe30] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#eabe30] rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
        <p className="text-[#1c1c1c] font-medium text-lg [font-family:'Poppins',Helvetica]">
          Loading...
        </p>
      </div>
    </div>
  );
};
