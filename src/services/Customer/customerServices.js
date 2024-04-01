import * as request from "src/utils/request";
export const getCustomer = async (page) => {
  try {
    const res = await request.get("/customers", {
      params: {
        page,
      },
    });
    return {
      data: res.data,
      totalPage: res.last_page,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getTotalCustomer = async () => {
  try {
    const res = await request.get("/totalCustomer");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const postCustomer = async (data) => {
  try {
    const res = await request.post("/customer/create", data);
    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    return {
      error: error.response.data.error,
      success: false,
    };
  }
};
