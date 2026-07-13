import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Card = ({ image }) => {
  const { selectedImage, setSelectedImage } = useContext(userDataContext);

  const isSelected = selectedImage === image;

  return (
    <div
      onClick={() => setSelectedImage(image)}
      className={`w-[150px] h-[200px] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300
      ${
        isSelected
          ? "border-4 border-yellow-400 scale-105 shadow-2xl"
          : "bg-white hover:scale-105"
      }`}
    >
      <img src={image} alt="assistant" className="w-full h-full object-cover" />
    </div>
  );
};

export default Card;
