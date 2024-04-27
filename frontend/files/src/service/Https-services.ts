import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./http-server";
const baseUrl = process.env.REACT_APP_API_URL;

const get = (url: string) => {
  return axiosInstance.get(baseUrl + `${url}`, {});
};

const del = (url: string) => {
  return axiosInstance.delete(baseUrl + `${url}`, {});
};

const post = (url: string, data: any) => {
  return axiosInstance.post(baseUrl + url, data);
};

const put = (url: string, data: any) => {
  return axiosInstance.put(baseUrl + url, data);
};

const postWithHeader = (url: string, data: any, header: any) => {
  return axiosInstance.post(url, data, header);
};

const patch = (url: string, data: any) => {
  return axiosInstance.patch(baseUrl + url, data);
};

const HttpService = {
  get,
  post,
  put,
  postWithHeader,
  patch,
  del,
};

export default HttpService;
