import React from "react";
import { createMockFormSubmission } from "./service/mockServer";

const Header = () => {
  return (
    <header className="px-6 py-4 bg-indigo-700">
      <div className="max-w-screen-lg	mx-auto flex items-center justify-between">
        <h2 className="text-2xl text-white">Toast Exercise</h2>
        <button
          className="py-2 px-4 bg-white text-indigo-700 rounded text-sm"
          onClick={() => createMockFormSubmission()}
        >
          NEW SUBMISSION
        </button>
      </div>
    </header>
  );
};

export default Header;
