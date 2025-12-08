"use client";
import { ClipLoader } from "react-spinners";

const LoadingPage = () => {
    
  const override = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <ClipLoader
      className="#3b82f6"
      cssOverride={override}
      size={150}
      aria-label="Loading spinner"
    />
  );
};

export default LoadingPage;
