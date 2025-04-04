// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Add your initial state here
  // searchResult: JSON.parse(localStorage.getItem("searchResult")) || [],
  searchResult: [],
  //   searchQuery: localStorage.getItem("searchQuery") || null,
  selectedYacht: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      // localStorage.setItem("searchResult", JSON.stringify(action.payload));
      state.searchResult = action.payload;
      // state.searchQuery = action.payload
      //   localStorage.setItem("searchQuery", action.payload);
    },
    setSelectedYacht: (state, action) => {
      state.selectedYacht = action.payload;
    },
  },
});

export const { setSearchResult, setSelectedYacht } = searchSlice.actions;
export default searchSlice.reducer;
