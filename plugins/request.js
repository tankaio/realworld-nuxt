import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

export default ({ store }) => {
  // Add a request interceptor
  request.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      const user = store.state.user;
      if (user) config.headers["Authorization"] = "Token " + user.token;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  request.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};
