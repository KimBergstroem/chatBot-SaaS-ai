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

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post("/user/signup", {
      name,
      email,
      password,
    });
    if (response.status !== 201) {
      throw new Error("Unable to Signup");
    }
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Signup failed:", error);
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

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
