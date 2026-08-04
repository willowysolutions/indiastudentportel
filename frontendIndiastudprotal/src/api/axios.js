import axios from 'axios';
import { baseUrl } from "/src/api/constants.js";

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Just return the response if it's not a problematic one
    return response;
  },
  (error) => {
    // Check if the error is because of unauthenticated user
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === "unauthenticated")
    ) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default instance;

// import axios from 'axios';
// import { baseUrl } from './constants';

// const instance = axios.create({
//     baseURL: baseUrl
// });

// instance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(
//     response => {
//         // Just return the response if it's not a problematic one
//         return response;
//     },
//     error => {
//         // Check if the error is because of unauthenticated user
//         if (error.response && (error.response.status === 401 || error.response.data.message === 'unauthenticated')) {
//             localStorage.removeItem('token');
//         }

//         return Promise.reject(error);
//     }
// );

// export default instance;
