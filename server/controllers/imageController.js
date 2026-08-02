import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    console.log("Generating image...");
    console.log("Prompt:", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    console.log("ClipDrop Status:", response.status);

    const base64Image = Buffer.from(response.data).toString("base64");

    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log("========== CLIPDROP ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);

      try {
        console.log(
          "Response:",
          Buffer.from(error.response.data).toString()
        );
      } catch {
        console.log("Raw Response:", error.response.data);
      }
    }

    console.log("Message:", error.message);
    console.log("Code:", error.code);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};