
import axios from "axios";

export const useAllProducts = () => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Allproduct", {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.data; // Return the response data
       
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    fetchProducts,
  };
};
