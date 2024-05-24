"use client";
import React, { useEffect, useState } from "react";
import Inputfield from "./shared/Inputfield";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Products } from "./Interfaces";
import { geteditProduct, setEditProduct } from "@/redux/EditProductSlice";
const accessoriesCategories = [
  "Headphones",
  "Chargers",
  "Power Banks",
  "Screen Protectors",
  "Phone Cases",
  "Smart Watches",
  "Bluetooth Speakers",
  "Memory Cards",
  "USB Cables",
  "Others",
];
interface ProductsTablesProps {
  Tabshift: () => void;
}
const Edit_Product: React.FC<ProductsTablesProps> = ({ Tabshift }) => {
  //get data from edir product slice
  const { products } = useAppSelector((s) => s.products);
  //Dispatch to make slice null
  const Dispatch = useAppDispatch()
  //
  const [inputValue, setInputValue] = useState("");
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [productdata, setProductdata] = useState({
    Product_Name: "",
    Details: "",
    Price: "",
    Sale_price: "",
    Category: "",
  });
  useEffect(() => {
    if (products) {
      setProductdata(products), setStringArray(products?.Product_Image);
    }
  }, [products]);

  //On change function to get values
  const getProductvalue = (e: any) => {
    const { name, value } = e.target;
    setProductdata((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get Image url from input
  const handleAddString = () => {
    if (inputValue.trim() !== "") {
      if (stringArray.length < 4) {
        setStringArray([...stringArray, inputValue.trim()]);
        setInputValue("");
      } else {
        toast.error("You can't add more than 4 images");
      }
    }
  };
  // delete image using index
  const handleDeleteString = (index: number) => {
    const newArray = stringArray.filter((_, i) => i !== index);
    setStringArray(newArray);
  };
  //Reset All Fields In page
  const resetProductData = () => {
    setProductdata({
      Product_Name: "",
      Details: "",
      Price: "",
      Sale_price: "",
      Category: "",
    });
    setStringArray([]);
    setInputValue("");
  };
  //Submit Product details
  const UpdateProductHandle = async (e: any) => {
    e.preventDefault();
    const { Product_Name, Details, Price, Category } = productdata;
    if (
      !Product_Name.trim() ||
      !Details.trim() ||
      !Price.trim() ||
      !Category.trim()
    ) {
      toast.error("All fields except Sale Price are required.");
      return;
    }

    if (stringArray.length === 0) {
      toast.error("Product Image is required.");
      return;
    }
    const productpayload = {
      ...productdata,
      Product_Image: stringArray,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/updateproduct",
        productpayload,
        { withCredentials: true }
      );
      if (response.data.success) {
        const success_message = response.data.message;
        toast.success(success_message);
        resetProductData();
       Dispatch(setEditProduct(null))
        Tabshift();
      } else {
        const error_message = response.data.message;
        toast.error(error_message);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        console.warn("Error submitting data:", error);
        toast.error("An error occurred"); // Notify user about the error
      }
    }
  };
  return (
    <div>
      <div className="py-12">
        <div>
          <div className="md:flex gap-3">
            <div className=" md:w-1/2">
              <Inputfield
                label="Enter Product Name"
                name="Product_Name"
                onChange={getProductvalue}
                type={"text"}
                value={productdata.Product_Name}
              />
              <div className="my-3">
                <label>Enter product Details</label>
                <textarea
                  name="Details"
                  rows={3}
                  onChange={getProductvalue}
                  value={productdata.Details}
                  className="w-full mt-2 py-2 px-2 bg-slate-100 focus:outline-none rounded-lg focus-within:shadow "
                />
              </div>
            </div>
            {/* Image Input and Display of image */}
            <div className="md:w-1/2">
              <div className="">
                <label htmlFor="Image-url">Please Enter Image Url </label>
                <div className="flex gap-2 items-end ">
                  <input
                    className="w-full mt-2 py-2 px-2 bg-slate-100 focus:outline-none rounded-lg focus-within:shadow "
                    id="string-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    onClick={handleAddString}
                    className={`${
                      stringArray.length >= 4
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } bg-red-400 w-48 hover:bg-black transform transition-all duration-300 text-white font-medium  rounded-lg py-2  `}
                  >
                    Add
                  </button>
                </div>
              </div>
              {stringArray.length > 0 ? (
                <>
                  <div className="flex gap-2 my-8  md:mt-10 lg:mt-4  xl:gap-4">
                    {stringArray.map((i, index) => (
                      <div key={index} className="relative ">
                        <img
                          src={i}
                          className="rounded-lg lg:h-28 lg:w-28 w-20 h-20 xl:w-32 xl:h-32"
                        />
                        <span className="absolute top-0 text-red-400 font-bold">
                          <RxCrossCircled
                            className="cursor-pointer"
                            onClick={() => handleDeleteString(index)}
                            size={25}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex gap-2 my-8  md:mt-10 lg:mt-4  xl:gap-4">
                  {Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <FaRegImage
                        key={index}
                        className="text-4xl lg:h-28 lg:w-28 w-20 h-20 xl:w-32 xl:h-32"
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="md:flex items-end gap-4">
            <div className="md:w-1/3">
              <Inputfield
                label="Enter Price"
                name="Price"
                onChange={getProductvalue}
                type={"text"}
                value={productdata.Price}
              />
            </div>
            <div className="md:w-1/3 my-3 md:my-0">
              <Inputfield
                label="Sale Price"
                name="Sale_price"
                onChange={getProductvalue}
                type={"text"}
                value={productdata.Sale_price}
              />
            </div>
            <div className="md:w-1/3 ">
              <select
                onChange={getProductvalue}
                value={productdata.Category || ""}
                name="Category"
                className="bg-slate-100 w-full py-[0.6rem] px-2 rounded-lg"
              >
                <option value="" disabled>
                  Choose Category
                </option>
                {accessoriesCategories.map((i, index) => (
                  <option className="py-2">{i}</option>
                ))}
              </select>
            </div>
          </div>
          <div></div>
        </div>
        <div className="text-center  mt-12">
          <button
            onClick={
              UpdateProductHandle
            }
            className="text-white bg-red-400 py-2 w-1/3 rounded-lg hover:bg-black transition-all transform duration-500"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit_Product;
