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
      error: error.response?.data?.error,
      success: false,
    };
  }
};
