import React, { useContext, useState, useEffect, useRef } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import ai from "../assets/ai.gif";
import user from "../assets/user.gif";

const Main = () => {
  const { userData, setUserData, serverUrl, getGeminiResponse } =
    useContext(userDataContext);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);

  // Handles whatever "command type" Gemini returns
const handleCommand = (data) => {
  if (!data) return;

  const { type, userInput, response } = data;

  const query = encodeURIComponent(userInput || "");

  switch (type) {
    case "google_search":
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
      break;

    case "youtube_search":
    case "youtube_play":
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
      break;

    case "youtube_open":
      window.open("https://www.youtube.com", "_blank");
      break;

    case "facebook_open":
      window.open("https://www.facebook.com", "_blank");
      break;

    case "instagram_open":
      window.open("https://www.instagram.com", "_blank");
      break;

    case "whatsapp_open":
      window.open("https://web.whatsapp.com", "_blank");
      break;

    case "calculator_open":
      window.open("https://www.google.com/search?q=calculator", "_blank");
      break;

    case "weather_show":
      window.open(
        `https://www.google.com/search?q=weather+${query}`,
        "_blank"
      );
      break;

    case "open_website": {
      let url = response || userInput;

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      window.open(url, "_blank");
      break;
    }

    default:
      break;
  }
};

 useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognitionRef.current = recognition;

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  const startListening = () => {
    if (isSpeakingRef.current || isListeningRef.current) return;

    try {
      recognition.start();
    } catch {}
  };

  const stopListening = () => {
    if (!isListeningRef.current) return;

    try {
      recognition.abort();
    } catch {}
  };

  recognition.onstart = () => {
    isListeningRef.current = true;
  };

  recognition.onresult = async (e) => {
    const transcript =
      e.results[e.results.length - 1][0].transcript.trim();

    setAiText("");
    setUserText(transcript);

    if (!userData?.assistantName) return;

    const assistantName = userData.assistantName.toLowerCase();

    if (!transcript.toLowerCase().includes(assistantName)) return;

    stopListening();

    try {
      const data = await getGeminiResponse(transcript);

      setAiText(data?.response || "");
      setUserText("");

      if (!data) {
        startListening();
        return;
      }

      const restartMic = () => {
        isSpeakingRef.current = false;

        setTimeout(() => {
          startListening();
        }, 500);
      };

      if (data.response) {
        isSpeakingRef.current = true;

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(data.response);

        speech.lang = "hi-IN";
        speech.rate = 1;
        speech.pitch = 1;

        speech.onend = () => {
          setAiText("");
          handleCommand(data);
          restartMic();
        };

        speech.onerror = () => {
          handleCommand(data);
          restartMic();
        };

        window.speechSynthesis.speak(speech);
      } else {
        handleCommand(data);
        restartMic();
      }
    } catch (error) {
      console.error(error);

      isSpeakingRef.current = false;

      setTimeout(() => {
        startListening();
      }, 800);
    }
  };

  recognition.onerror = (e) => {
    if (
      e.error === "aborted" ||
      e.error === "no-speech" ||
      e.error === "audio-capture"
    ) {
      return;
    }

    if (e.error !== "not-allowed") {
      isListeningRef.current = false;

      setTimeout(() => {
        startListening();
      }, 1000);
    }
  };

  recognition.onend = () => {
    isListeningRef.current = false;

    if (!isSpeakingRef.current) {
      setTimeout(() => {
        startListening();
      }, 800);
    }
  };

  startListening();

  return () => {
    stopListening();
    window.speechSynthesis.cancel();
  };
}, [userData]);

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      if (result.status === 200) {
        setUserData(null);
      }
      navigate("/");
    } catch (error) {
      setUserData(null);
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#0B0D46] to-[#000000] p-4 md:p-6 flex flex-col">
      {/* ================= Header ================= */}

      <header className="flex-shrink-0 h-20 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">
            {userData?.assistantName || "Your Assistant"}
          </h1>

          <p className="text-white/60 text-sm">Voice Assistant</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/customize")}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-indigo-500 transition flex items-center justify-center text-white cursor-pointer hover:text-white"
          >
            <FaEdit />
          </button>

          <button
            onClick={handleLogout}
            className="w-11 h-11 rounded-xl bg-red-500/20 hover:bg-red-500 transition flex items-center justify-center text-red-400 hover:text-white cursor-pointer"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* ================= Main ================= */}

      <main className="flex-1 flex flex-col justify-evenly items-center">
        {/* Avatar */}

        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-[90px] opacity-40 rounded-full"></div>

          <div className="mt-2 relative w-40 h-40 lg:w-55 lg:h-55 rounded-full overflow-hidden border-4 border-indigo-400 shadow-[0_0_60px_rgba(99,102,241,.5)]">
            <img
              src={userData?.assistantImage}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

        {/* Name */}

        <div className="text-center">
          <h2 className="text-white text-3xl lg:text-3xl font-bold py-1">
            I'm {userData?.assistantName || "Your Assistant"}
          </h2>
        </div>

        {/* GIF */}

        <div className="flex justify-center items-center h-28 lg:h-32 mt-2">
          <img
            src={aiText ? ai : user}
            className="h-full w-auto object-contain rounded-lg"
            alt=""
          />
        </div>

        {/* Conversation */}

        <div className="w-full max-w-3xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-3">
            <p className="text-center text-white text-lg lg:text-xl font-medium min-h-[50px] flex justify-center items-center">
              {userText
                ? userText
                : aiText
                  ? aiText
                  : "Say something to start the conversation..."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
