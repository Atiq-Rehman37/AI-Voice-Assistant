import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      setUserData(response.data);

      console.log("User Updated:", response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      if (!userData) return;

      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        {
          prompt: command,
          assistantName: userData.assistantName,
          userName: userData.name,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Gemini API Response:", result.data);

      return result.data;
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    selectedImage,
    setSelectedImage,
    fetchCurrentUser,
    loading,
    getGeminiResponse,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
