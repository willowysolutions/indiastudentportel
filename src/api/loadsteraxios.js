import axios from "axios";
console.log("TEST API");
console.log("API Base URL:", import.meta.env.VITE_LOADSTER_URL);

const instance = axios.create({
  // baseURL: import.meta.env.VITE_LOADSTER_URL
  // baseURL: '/api'
  baseURL: "/proxy/edupath_webui/QuickTest/", // Use proxy for this
});

instance.interceptors.request.use(
  (config) => {
    const token =
      "CHANAKYA-API u_vTzIrDOA0Qo-_73K8qEvGDVMvrX6a-DZWIFhtrO2PeDpv69unrw00s3wEuPRDhQarP1Lk7C_GpUo0L7ipRZupOCs8rnQAab99rdKv1wzE";
    if (token) {
      config.headers["Authorization"] =token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === "unauthenticated")
    ) {
      console.log(error.res);
    }
    return Promise.reject(error);
  }
);

export default instance;
// // locally working code 
// import axios from 'axios';
// console.log("TEST API")
// console.log('API Base URL:', import.meta.env.VITE_LOADSTER_URL);


// const instance = axios.create({
//     // baseURL: import.meta.env.VITE_LOADSTER_URL
//     // baseURL: '/api'
//     baseURL: '/api/edupath_webui/QuickTest/'  // Use proxy for this  
// });

// instance.interceptors.request.use(
//     config => {
//         config.headers['Authorization'] = `${import.meta.env.VITE_LOADSTER_JWT}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response && (error.response.status === 401 || error.response.data.message === 'unauthenticated')) {
//             console.log(error.res);
//         }
//         return Promise.reject(error);
//     }
// );

// export default instance;