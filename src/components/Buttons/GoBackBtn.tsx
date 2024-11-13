import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
