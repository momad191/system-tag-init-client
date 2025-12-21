import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// const API_URL = "http://localhost:8000/auth/login";
import { LOGIN_URL } from "@/config/apiConfig";

/* -----------------------------
   Types
----------------------------- */
export interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  image?: string;
  role: string;
  type: string;
  status: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

/* -----------------------------
   Initial State
----------------------------- */
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

/* -----------------------------
   Login Thunk
----------------------------- */
export const login = createAsyncThunk<
  { access_token: string; user: AuthUser },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(data.message || "Login failed");
    }

    // ✅ Store token in cookies
    Cookies.set("token", data.access_token, {
      expires: 1, // 1 day
      secure: true,
      sameSite: "strict",
    });

    Cookies.set("userId", data.user._id, {
      expires: 1, // 1 day
      secure: true,
      sameSite: "strict",
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error");
  }
});

/* -----------------------------
   Slice
----------------------------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("userId");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
