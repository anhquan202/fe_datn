import * as request from "src/utils/request";
//product
export const getProduct = async (page, id) => {
  try {
    const res = await request.get("products", {
      params: {
        id,
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
export const getProductById = async (id) => {
  try {
    const res = await request.get(`products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const postProduct = async (data) => {
  try {
    const res = await request.post("/products", data);
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
export const putProduct = async (productId, data) => {
  try {
    const res = await request.post(`/products/${productId}`, data);
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
const productDetailApis = [
  { id: 1, apiUrl: "/phonedetails" },
  { id: 2, apiUrl: "/audiodetail" },
  { id: 3, apiUrl: "/computersdetail" },
];
export const postProductDetail = async (typeID, data) => {
  const product = productDetailApis.find((item) => item.id === typeID);
  try {
    const res = await request.post(product.apiUrl, data);
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
export const GetProductByType = async (typeID, page) => {
  try {
    const res = await request.get("products/producttype", {
      params: {
        typeID,
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
export const getAudioDetail = async (page) => {
  try {
    const res = await request.get("audiodetails", {
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
export const getPhoneDetail = async () => {
  try {
    const res = await request.get("phonedetails");
    return {
      data: res.data,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getComputersDetail = async (page) => {
  try {
    const res = await request.get("computersdetail", {
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
