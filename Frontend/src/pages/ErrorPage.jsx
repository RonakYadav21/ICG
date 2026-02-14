import React from "react";
import PageNotFound from "../assets/pageNotFound.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen">
      <img
        src={PageNotFound}
        className="absolute top-0 left-0 w-full h-full object-contain"
        alt="404"
        draggable="false"
      />

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-gray-500 text-white border-2 border-black px-4 py-2 rounded shadow font-semibold
        hover:cursor-pointer hover:text-gray-300
        "
      >
        RETURN TO HOMEPAGE
      </button>
    </div>
  );
};

export default ErrorPage;
