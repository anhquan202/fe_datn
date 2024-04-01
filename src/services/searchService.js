import * as request from "src/utils/request";
export const searchData = async ( params, path) => {
  try {
    const res = await request.get(path, {
      params: {
        ...params,
      },
    });
    return {
      data: res.data,
      totalPage: res.last_page,
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
};
