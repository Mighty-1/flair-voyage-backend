import { createSlice } from "@reduxjs/toolkit";

// Initialize state as an object with a 'items' array
const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      // Update the 'items' array in the state
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
    },
    addToWishlist: (state, action) => {
      // Add the new item to the 'items' array
      state.items.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      // Filter out the item to remove from the 'items' array
      state.items = state.items.filter((id) => id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;