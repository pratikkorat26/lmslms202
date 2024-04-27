import { useEffect } from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Navigate } from "react-router-dom";
import { APP_ROUTES, API_ROUTES } from "../utils/constants";
// import { toast } from "react-toastify";
// import useCommonDetails from "./useCommonDetails";
const website: any = process.env.REACT_APP_ENV;

export type authDetailsType = {
  token: string;
};

export function setAuth(data: authDetailsType) {
  const oldAuth: any = getCurrentAuth();

  const tempAuth = { ...oldAuth, ...data };
  tempAuth.token = data.token;

  localStorage.setItem("auth", JSON.stringify(tempAuth));
}

export const getCurrentAuth = () => {
  const localAuth = localStorage.getItem("auth");
  const auth: authDetailsType = localAuth
    ? JSON.parse(localStorage.getItem("auth") || "")
    : {};
  return auth;
};

export const Logout = () => {
  localStorage.removeItem("auth");
  window.location.href = `${APP_ROUTES.Landing}`;
};
const axiosInstance = axios.create();

const refresh = async () => {
  const auth = getCurrentAuth();
  console.log("auth ::", auth);
  // const userDetial = useCommonDetails();

  console.log("I am in refreshn  ", auth);
  const uid = JSON.parse(localStorage.getItem("auth") as any);

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}${API_ROUTES.RefreshToken}`,
      {
        userId: "" + uid.id,
      },
      { headers: headers }
    );
    if (response.data) {
      const body: any = response.data.data;
      setAuth(body);
      return body.token;
    }
  } catch (error: any) {
    Logout();
  }
};

let flag = false;
const refreshExpiredTokenClosure = () => {
  let isCalled = false;
  let runningPromise: any = undefined;
  return () => {
    if (isCalled && flag) {
      return runningPromise;
    } else {
      isCalled = true;
      flag = true;
      runningPromise = refresh();

      return runningPromise;
    }
  };
};
function shouldRetry(config: any) {
  return config.retries.count < 3;
}
const refreshExpiredToken = refreshExpiredTokenClosure();

axiosInstance.interceptors.request.use(
  // @ts-ignore: Unreachable code error
  (config: AxiosRequestConfig) => {
    const auth = getCurrentAuth();
    if (!config.headers!["authorization"]) {
      config.headers!["authorization"] = `Bearer ${auth?.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    error.config.retries = error.config?.retries || {
      count: 0,
    };
    const originalRequest = error.config;

    // logout user's session if refresh token api responds 401 UNAUTHORIZED

    // if request fails with 401 UNAUTHORIZED status and 'Token has expired' as response message
    // then it calls the api to generate new access token
    if (
      error.response.status == 403 &&
      error.response.statusText == "Forbidden"
    ) {
      Logout();
    }
    if (error.response.status === 401 && shouldRetry(error.config)) {
      error.config.retries.count += 1;
      const updatedToken = await refreshExpiredToken();
      console.log(updatedToken);
      if (!updatedToken) {
        Logout();
      } else {
        originalRequest.headers["authorization"] = `Bearer ${updatedToken}`;
        flag = false;
        return axiosInstance(originalRequest);
      }
    } else {
      // toast.error(error?.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
