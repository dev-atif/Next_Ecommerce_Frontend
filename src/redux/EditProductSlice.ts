import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Products } from "@/app/components/Interfaces";

interface State {
  products: Products | null;
}

const initialState: State = {
  products: null,
};

export const Editproduct = createSlice({
  name: "products",
  initialState,
  reducers: {
    setEditProduct: (state, action: PayloadAction<Products | null>) => {
      state.products = action.payload;
    },
  },
});
export const { setEditProduct } = Editproduct.actions;
export const geteditProduct = (state: RootState) => state.user.user;
export default Editproduct.reducer;
