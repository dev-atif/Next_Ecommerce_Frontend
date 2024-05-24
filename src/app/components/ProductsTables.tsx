'use client'
import { useAllProducts } from "@/hooks/useAlldata";
import React, { useEffect, useState } from "react";
import { Products } from "./Interfaces";
import { AiOutlineEdit } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useAppDispatch } from "@/hooks/redux";
import { setEditProduct } from "@/redux/EditProductSlice";
interface ProductsTablesProps {
  Tabshift: () => void;
}

const ProductsTables: React.FC<ProductsTablesProps> = ({Tabshift}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const { fetchProducts} = useAllProducts();

  const Dispatch = useAppDispatch();
  const Edutproduct = (product: Products) => {
    const payload = {
      ...product,
      isEdit: true,
    };
    Dispatch(setEditProduct(payload));
  };
  useEffect(()=>{
    fetchProducts().then((data) => {
   setProducts(data ||[])
    });
  },[products])
  
  return (
    <div className="">
      <div>
        <div className="overflow-x-auto py-10 ">
          <table className="table  ">
            {/* head */}
            <thead className="bg-red-400 text-white text-center">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products.map((item, index) => (
                <tr className="text-center">
                  <td className="w-1/4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={(item as Products)?.Product_Image[0]}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold runcate overflow-hidden whitespace-nowrap">
                          {(item as Products)?.Product_Name.split(" ").length >
                          6
                            ? (item as Products)?.Product_Name.split(" ")
                                .slice(0, 6)
                                .join(" ") + "..."
                            : (item as Products)?.Product_Name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <span className="badge badge-ghost badge-md text-base font-semibold ">
                      {" "}
                      {(item as Products)?.Price}
                      {/* {(item as Products)?.Sale_price ? ((item as Products)?.Sale_price):(
                      'NA'
                     )} */}
                    </span>
                  </td>
                  <td className="">
                    <span className="badge badge-ghost badge-md text-md font-semibold text-red-400">
                      {(item as Products)?.Sale_price
                        ? (item as Products)?.Sale_price
                        : "NA"}
                    </span>
                  </td>
                  <td>{(item as Products)?.Category}</td>
                  <td>
                    <div>
                      <span className="flex gap-3 justify-center">
                        <AiOutlineEdit
                          onClick={() => {
                            Edutproduct(item);
                            Tabshift();
                          }}
                          className="bg-[#86EFAC] rounded-full p-1 text-white cursor-pointer hover:bg-black transition transform duration-500"
                          size={30}
                        />
                        <CiTrash
                          className="bg-red-400 rounded-full p-1 text-white cursor-pointer hover:bg-black transition transform duration-500"
                          size={30}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTables;
