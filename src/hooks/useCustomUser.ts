

import axios from "axios";

export const CustomUser = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user", {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.data; // Return the response data
        /* console.log("test", response.data.data); // Do something with the response data */
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    fetchData,
  };
};
