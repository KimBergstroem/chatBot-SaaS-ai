import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("/user/login", { email, password });
    if (response.status !== 200) {
      throw new Error("Unable to Login");
    }
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get("/user/auth-status");
    if (response.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};
