import React, { useCallback, useEffect, useState } from "react";
import { fetchLikedFormSubmissions } from "./service/mockServer";
import Skeleton from "./Skeleton";

const Submissions = ({ likedSubmissions, setLikedSubmissions }) => {
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";
  const hasError = status === "error";

  const fetchLikedSubmissions = useCallback(async () => {
    try {
      // Initialize loading
      setStatus("loading");

      const response = await fetchLikedFormSubmissions();

      setLikedSubmissions(response.formSubmissions);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  }, [setLikedSubmissions]);

  useEffect(() => {
    // Initial call to display liked submissions
    fetchLikedSubmissions();
  }, [fetchLikedSubmissions]);

  return hasError ? (
    <div className="px-4 py-2 bg-red-400 flex items-center justify-between text-white rounded">
      Oops. Something went wrong. Try again.
    </div>
  ) : isLoading ? (
    <Skeleton />
  ) : likedSubmissions?.length ? (
    <div className="flex flex-col gap-2">
      {likedSubmissions.map((submission, index) => {
        const { firstName, lastName, email } = submission;
        return (
          <div
            key={index}
            className="p-4 bg-indigo-700 flex items-center justify-between text-white max-w-80 rounded"
          >
            <div className="flex flex-col">
              <div className="flex">
                {firstName} {lastName}
              </div>
              <div>{email}</div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="px-4 py-2 bg-indigo-500 flex items-center justify-between text-white rounded">
      No submissions found.
    </div>
  );
};

export default Submissions;
