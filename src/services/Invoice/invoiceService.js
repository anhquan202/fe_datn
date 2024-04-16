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
export const getInvoiceById = async (id) => {
  try {
    const res = await request.get(`/invoices/${id}`);
    return {
      data: res.data,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getTotalInvoices = async () => {
  try {
    const res = await request.get("/invoiceCount");
    return res;
  } catch (error) {
    return error;
  }
};
export const getTotalSales = async () => {
  try {
    const res = await request.get("/totalSales");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getHotProduct = async () => {
  try {
    const res = await request.get("/hotProduct");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getInvoiceDetail = async (invoice_id) => {
  try {
    const res = await request.get("/invoiceDetail", {
      params: {
        invoice_id,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTotalAmountByDay = async () => {
  try {
    const res = await request.get('/totalAmountByWeeks', )
    return {
      data: res,
    };
  } catch (error) {
    return {
      error,
    }
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
      error: error.response.data.error || error.response.data,
      success: false,
    };
  }
};
export const updateStatusInvoice = async (id, status) => {
  try {
    const res = await request.post(`/updateStatus/${id}`, status);
    return {
      message: res.message,
      success: true,
    };
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
};
