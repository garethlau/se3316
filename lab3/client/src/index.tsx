import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { getAccessToken, setAccessToken } from "./accessToken";

// Send cookies with all requests
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    if (config && config.headers) {
      const accessToken = getAccessToken();
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error) // Do something with the error
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (axios.isCancel(error)) {
      // Request was cancelled, do not retry
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      // The failed response is from the refresh token endpoint, do not retry
      return Promise.reject(error);
    }

    // Failed authentication and have not yet retried this request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // Attempt to refresh token
      return axios.get("/api/auth/refresh-token").then((response) => {
        const accessToken = response?.data?.accessToken || "";
        setAccessToken(accessToken);
        // Retry the original request
        return axios(originalRequest);
      });
    }

    // Return the error if we have already retried the original request
    return Promise.reject(error);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
