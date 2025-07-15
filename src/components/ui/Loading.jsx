import React from "react";

const Loading = ({ type = "products" }) => {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="skeleton h-48 w-full rounded-lg mb-4"></div>
            <div className="skeleton h-4 w-3/4 mb-2"></div>
            <div className="skeleton h-3 w-1/2 mb-2"></div>
            <div className="skeleton h-4 w-1/4 mb-2"></div>
            <div className="skeleton h-8 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "product-detail") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="skeleton h-96 w-full rounded-lg"></div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton h-20 w-full rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4"></div>
            <div className="skeleton h-6 w-1/2"></div>
            <div className="skeleton h-10 w-1/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/5"></div>
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cart") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="skeleton h-24 w-24 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-3 w-1/2"></div>
                    <div className="skeleton h-4 w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-fit">
            <div className="skeleton h-6 w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="skeleton h-12 w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <div className="skeleton h-12 w-12 rounded-full mx-auto mb-4"></div>
        <div className="skeleton h-4 w-32 mx-auto mb-2"></div>
        <div className="skeleton h-3 w-24 mx-auto"></div>
      </div>
    </div>
  );
};

export default Loading;