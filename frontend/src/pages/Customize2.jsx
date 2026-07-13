import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";

// Icons
import { FaRobot } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoRocketSharp } from "react-icons/io5";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const { selectedImage, userData, serverUrl, setUserData } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || "",
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNext = async () => {
    if (!assistantName.trim() || !selectedImage) return;

    try {
      setLoading(true);

      let response;

      // 🔥 CASE 1: If image is FILE (user uploaded)
      if (selectedImage instanceof File) {
        const formData = new FormData();
        formData.append("assistantName", assistantName);
        formData.append("assistantImage", selectedImage); // 👈 important (file)

        response = await axios.post(
          `${serverUrl}/api/user/updateAssistant`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }
      // 🔥 CASE 2: If image is URL (from assets)
      else {
        response = await axios.post(
          `${serverUrl}/api/user/updateAssistant`,
          {
            assistantName,
            imageUrl: selectedImage,
          },
          { withCredentials: true },
        );
      }

      // ✅ Update global state
      setUserData(response.data);

      // 🚀 Go to main page
      navigate("/main");
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-purple-600 to-indigo-600 flex flex-col items-center justify-center px-6">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaRobot className="text-white text-3xl" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Name Your Assistant
          </h1>
        </div>

        <p className="text-white/80 text-sm max-w-sm">
          Give your virtual assistant a unique name to personalize your AI
          experience.
        </p>
      </div>

      {/* Image Preview */}
      {selectedImage ? (
        <div className="w-[130px] h-[160px] rounded-2xl overflow-hidden shadow-xl mb-6 border-2 border-white">
          <img
            src={
              selectedImage instanceof File
                ? URL.createObjectURL(selectedImage)
                : selectedImage
            }
            alt="assistant"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <p className="text-white/80 mb-6 text-sm">No assistant selected</p>
      )}

      {/* Input */}
      <div className="flex items-center bg-white rounded-xl shadow-md w-full max-w-sm px-3 mb-6 focus-within:ring-2 focus-within:ring-yellow-400">
        <MdDriveFileRenameOutline className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Enter assistant name..."
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
          className="w-full px-3 py-3 outline-none text-gray-800 rounded-xl"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleNext}
        disabled={!assistantName.trim() || !selectedImage || loading}
        className={`flex items-center gap-2 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300
        ${
          assistantName.trim() && selectedImage && !loading
            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-105 hover:from-purple-600 hover:to-indigo-600 active:scale-95"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        <IoRocketSharp />
        {loading ? "Creating..." : "Create Assistant"}
      </button>
    </div>
  );
};

export default Customize2;
