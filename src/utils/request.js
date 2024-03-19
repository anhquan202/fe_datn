import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8081/be_datn/datn/public/api/",
});

export const get = async (path, options = {}) => {
  const respone = await request.get(path, options);
  return respone.data;
};
export const post = async (path, data, options = {}) => {
  const respone = await request.post(path, data, options);
  return respone.data;
};
export default request;
export const put = async (path, data, options = {}) => {
  const respone = await request.put(path, data, options);
  return respone.data;
};
