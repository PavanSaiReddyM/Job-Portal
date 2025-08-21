import { createSlice } from "@reduxjs/toolkit";

// Safely parse user from localStorage
let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (e) {
  userFromStorage = null;
}

const initialState = {
  loading: false,
  user: userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
