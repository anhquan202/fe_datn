import request from "src/utils/request";

export const login = async (email, password) => {
  try {
    const data = {
      email,
      password,
    };
    const res = await request.post("login", data);
    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    return {
      message: error.response?.data?.error || "Unknown error", // Get error message, if available
      success: false,
    };
  }
};
