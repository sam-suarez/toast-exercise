import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 bg-indigo-200 h-[80px] animate-pulse max-w-80 rounded" />
      <div className="p-4 bg-indigo-200 h-[80px] animate-pulse max-w-80 rounded" />
      <div className="p-4 bg-indigo-200 h-[80px] animate-pulse max-w-80 rounded" />
      <div className="p-4 bg-indigo-200 h-[80px] animate-pulse max-w-80 rounded" />
    </div>
  );
};

export default Skeleton;
