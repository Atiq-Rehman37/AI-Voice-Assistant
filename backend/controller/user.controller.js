import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import moment from "moment";
import gemini_response from "../gimini.js";
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true },
    ).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { prompt, assistantName, userName } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    if (!assistantName || !userName) {
      return res.status(400).json({
        message: "Assistant name and user name are required",
      });
    }

    const result = await gemini_response(prompt, assistantName, userName);

    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({
        type: "general",
        userInput: prompt,
        response: "Invalid JSON returned from Gemini",
      });
    }

    const gemResult = JSON.parse(jsonMatch[0]);

    const type = gemResult.type || "general";
    const userInput = gemResult.userinput || prompt;
    const response = gemResult.response || "I am here to help.";

    switch (type) {
      case "general":
        return res.status(200).json({
          type,
          userInput,
          response,
        });

      case "get_time":
        return res.status(200).json({
          type,
          userInput,
          response: `The current time is ${moment().format("h:mm:ss A")}`,
        });

      case "get_date":
        return res.status(200).json({
          type,
          userInput,
          response: `Today's date is ${moment().format("MMMM Do YYYY")}`,
        });

      case "get_day":
        return res.status(200).json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.status(200).json({
          type,
          userInput,
          response: `The current month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "whatsapp_open":
      case "youtube_open":
      case "weather_show":
      case "open_website":
      case "open_app":
        return res.status(200).json({
          type,
          userInput,
          response,
        });

      default:
        return res.status(200).json({
          type: "general",
          userInput,
          response,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
