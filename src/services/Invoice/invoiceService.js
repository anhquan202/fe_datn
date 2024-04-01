import * as request from "src/utils/request";

export const getInvoice = async (page) => {
  try {
    const res = await request.get("/invoices", {
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
export const getTotalInvoices = async () => {
  try {
    const res = await request.get('/invoiceCount');
    return res;
  } catch (error) {
    return error
  }
}
export const getTotalSales = async () => {
  try {
    const res = await request.get('/totalSales');
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const postInvoice = async (data) => {
  try {
    const res = await request.post("/invoices", data);
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
