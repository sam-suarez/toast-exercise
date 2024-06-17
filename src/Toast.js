import { CloseOutlined } from "@mui/icons-material";
import clsx from "clsx";
import React, { useState } from "react";
import { useEffect } from "react";
import { onMessage, saveLikedFormSubmission } from "./service/mockServer";

const Toast = ({ setLikedSubmissions }) => {
  const [status, setStatus] = useState("idle");
  const [submission, setSubmission] = useState(null);
  const { firstName, lastName, email } = submission ?? {};

  const isLoading = status === "loading";
  const hasError = status === "error";

  useEffect(() => {
    // Listen for submissions
    onMessage(({ data }) => {
      // Set submission data
      setSubmission(data);
    });
  }, []);

  const handleLike = async () => {
    if (!submission) return;

    const updatedSubmission = {
      ...submission,
      // "liked" property is not used but still decided to update since it's part of the initial object
      liked: true,
    };

    try {
      // Initialize loading
      setStatus("loading");

      await saveLikedFormSubmission(updatedSubmission);

      setLikedSubmissions((prevSubmissions) => [
        ...prevSubmissions,
        updatedSubmission,
      ]);

      // Close toast after successful submission
      setSubmission(null);

      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleDismiss = () => {
    setSubmission(null);
  };

  useEffect(() => {
    // Prevents effect from running if there are no submissions
    if (!submission) return;

    const timeout = setTimeout(() => {
      handleDismiss();
    }, 6000);

    // Clear timeouts to prevent simultaneous calls
    return () => {
      clearTimeout(timeout);
    };
  }, [submission, status]);

  return (
    <div
      className={clsx(
        "fixed right-6 bottom-6 p-4 bg-indigo-700 rounded min-w-80 transition-all duration-150 ease-out",
        // This handles the entry animation
        { "translate-x-0 blur-none opacity-100": submission },
        { "translate-x-[120%] blur-md opacity-0": !submission }
      )}
    >
      <div>
        <div className="flex items-center justify-between text-white">
          <div className="flex flex-col">
            <div className="flex">
              {firstName} {lastName}
            </div>
            <div>{email}</div>
          </div>
          <button
            className="py-2 px-4 bg-white rounded text-indigo-700 text-xs"
            onClick={handleLike}
          >
            LIKE
          </button>
          <button className="" onClick={handleDismiss}>
            <CloseOutlined />
          </button>
        </div>
        {(hasError || isLoading) && (
          <p className="mt-2 text-white">
            {isLoading ? "Loading..." : "Oops, Something went wrong."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Toast;
