// // authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: JSON.parse(localStorage.getItem("token")) || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       localStorage.setItem("isAuthenticated", JSON.stringify(true));
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       localStorage.setItem("token", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

// Initial state is now defined without localStorage operations,
// as redux-persist will handle persistence automatically.
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // The login action now expects an object with 'user' and 'token' properties.
    // It updates the state without manual localStorage calls.
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // The logout action clears the state.
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
