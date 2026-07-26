import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Load User Credits
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/credits",
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message);
        setToken("");
        localStorage.removeItem("token");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setToken("");
      localStorage.removeItem("token");
    }
  };

  // Generate Image
  const generateImage = async (prompt) => {
    try {
      if (credit <= 0) {
        toast.error("No Credit Balance");
        navigate("/buy");
        return null;
      }

      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        await loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);

        if (data.creditBalance <= 0) {
          navigate("/buy");
        }

        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    generateImage,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;