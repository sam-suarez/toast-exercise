import React, { useState } from "react";
import Toast from "./Toast";
import Submissions from "./Submissions";

const Content = () => {
  // Declare state to parent to be accessible by both children Submissions and Toast
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  return (
    <div className="max-w-screen-lg	mx-auto py-6">
      <h1 className="text-2xl">Liked Form Submissions</h1>
      <div className="mt-4">
        <Submissions
          likedSubmissions={likedSubmissions}
          setLikedSubmissions={setLikedSubmissions}
        />
      </div>
      <Toast setLikedSubmissions={setLikedSubmissions} />
    </div>
  );
};

export default Content;
