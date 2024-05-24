export interface Products {
  _id: string;
  Product_Name: string;
  Details: string;
  Price: string;
  Sale_price: string; // Optional because it can be omitted
  Category: string;
  Product_Image: string[];
  createdAt: string;
  updatedAt: string;
  isEdit: boolean;
  __v: number;
}
