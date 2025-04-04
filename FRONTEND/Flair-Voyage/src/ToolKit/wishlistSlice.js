import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: JSON.parse(localStorage.getItem("wishlist")) || [],
  reducers: {
    setWishlist: (state, action) => {
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
      return action.payload;
    },
    addToWishlist: (state, action) => {
      const updatedWishlist = [...state, action.payload];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    },
    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.filter((id) => id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
