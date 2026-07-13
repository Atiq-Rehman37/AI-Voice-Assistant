import React, { useRef, useState, useContext } from "react";
import Card from "../components/Card";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
// Images
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.jpeg";
import img7 from "../assets/image7.jpeg";

const Customize = () => {
  const [customImage, setCustomImage] = useState(null);
  const { selectedImage } = useContext(userDataContext);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const items = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 },
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-purple-600 to-indigo-600 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-3xl font-bold text-white">
          Select Your Virtual Assistant 🤖
        </h1>
        <p className="text-gray-200 mt-3 text-sm md:text-base">
          Choose a style or upload your own assistant avatar
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Existing Cards */}
        {items.map((item) => (
          <Card key={item.id} image={item.image} />
        ))}

        {/* Show uploaded image if exists */}
        {customImage && <Card image={customImage} />}

        {/* Add Image Card */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-[150px] h-[200px] rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center text-white cursor-pointer hover:bg-white hover:text-black transition"
        >
          <span className="text-3xl">+</span>
          <p className="text-sm mt-2">Add Image</p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      {selectedImage && (
        <div className="flex justify-center mt-10">
          <button
            className="px-8 py-3 rounded-xl 
          bg-gradient-to-r from-purple-500 to-indigo-500 
    text-white font-semibold text-lg
    shadow-lg 
    hover:scale-105 hover:from-purple-600 hover:to-indigo-600 
    active:scale-95 
    transition-all duration-300
    cursor-pointer"
            onClick={() => navigate("/customize2")}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Customize;
