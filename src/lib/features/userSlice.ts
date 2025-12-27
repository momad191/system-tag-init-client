import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { USERS_URL } from "@/config/apiConfig";

/* ======================================================
   Types
====================================================== */

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile?: string;
  role: string;
  type: string;
  createdAt: string;
  status: string;
  image?: string;
  passwordHash?: string;
  access_reports?: boolean;
  access_broadcasts?: boolean;
  access_settings?: boolean;
  access_channels?: boolean;
  access_accounts?: boolean;
  is_email_verified?: boolean;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchUsersResponse {
  users: User[];
  pagination: Pagination;
}

interface UsersState {
  users: User[];
  allUsers: User[];
  userCount: number;
  selectedUser: User | null;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

/* ======================================================
   Async Thunks
====================================================== */

// ✅ Fetch users with pagination

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  { page?: number; limit?: number }
>("users/fetchUsers", async ({ page = 1, limit = 10 }, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return thunkAPI.rejectWithValue("No auth token");
    }

    const res = await fetch(`${USERS_URL}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();

    return {
      users: data.data.map((u: any) => ({
        id: u._id,
        fullName: u.fullName,
        email: u.email,
        mobile: u.mobile,
        role: u.role,
        type: u.type,
        createdAt: u.createdAt,
        status: u.status,
        access_reports: u.access_reports,
        access_broadcasts: u.access_broadcasts,
        access_settings: u.access_settings,
        access_channels: u.access_channels,
        access_accounts: u.access_accounts,
        is_email_verified: u.is_email_verified,
        passwordHash: u.passwordHash,
        image: u.image,
      })),
      pagination: data.pagination,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// ✅ Fetch single user
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("users/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${USERS_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to fetch user");
    }

    const user = await res.json();

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      type: user.type,
      createdAt: user.createdAt,
      status: user.status,
      access_reports: user.access_reports,
      access_broadcasts: user.access_broadcasts,
      access_settings: user.access_settings,
      access_channels: user.access_channels,
      access_accounts: user.access_accounts,
      is_email_verified: user.is_email_verified,
      passwordHash: user.passwordHash,
      image: user.image,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Create user
export const createUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        mobile: userData.mobile,
        email: userData.email,
        role: userData.role,
        passwordHash: userData.passwordHash,
        type: userData.type,
        status: userData.status,
        access_reports: userData.access_reports,
        access_broadcasts: userData.access_broadcasts,
        access_settings: userData.access_settings,
        access_channels: userData.access_channels,
        access_accounts: userData.access_accounts,
        is_email_verified: userData.is_email_verified,
        image: userData.image,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to create user");
    }

    const result = await res.json();

    return {
      id: result._id,
      fullName: result.fullName,
      email: result.email,
      mobile: result.mobile,
      role: result.role,
      type: result.type,
      createdAt: result.createdAt,
      status: result.status,
      access_reports: result.access_reports,
      access_broadcasts: result.access_broadcasts,
      access_settings: result.access_settings,
      access_channels: result.access_channels,
      access_accounts: result.access_accounts,
      is_email_verified: result.is_email_verified,
      passwordHash: result.passwordHash,
      image: result.image,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Fetch all users (no pagination)
export const fetchAllUsers = createAsyncThunk<User[]>(
  "users/fetchAllUsers",
  async () => {
    const token = Cookies.get("token");

    const res = await fetch(USERS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch all users");

    const data = await res.json();

    return data.data.map(
      (u: any): User => ({
        id: u._id,
        fullName: u.fullName,
        email: u.email,
        mobile: u.mobile,
        role: u.role,
        type: u.type,
        createdAt: u.createdAt,
        status: u.status,
        access_reports: u.access_reports,
        access_broadcasts: u.access_broadcasts,
        access_settings: u.access_settings,
        access_channels: u.access_channels,
        access_accounts: u.access_accounts,
        is_email_verified: u.is_email_verified,
        passwordHash: u.passwordHash,
        image: u.image,
      }),
    );
  },
);

// ✅ Update user
export const updateUserById = createAsyncThunk<
  User,
  { id: string; userData: Partial<User> },
  { rejectValue: string }
>("users/updateUserById", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${USERS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        image: userData.image,
        email: userData.email,
        role: userData.role,
        passwordHash: userData.passwordHash,
        mobile: userData.mobile,
        type: userData.type,
        status: userData.status,
        access_reports: userData.access_reports,
        access_broadcasts: userData.access_broadcasts,
        access_settings: userData.access_settings,
        access_channels: userData.access_channels,
        access_accounts: userData.access_accounts,
        is_email_verified: userData.is_email_verified,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to update user");
    }

    const updated = await res.json();

    return {
      id: updated._id,
      fullName: updated.fullName,
      email: updated.email,
      mobile: updated.mobile,
      role: updated.role,
      type: updated.type,
      createdAt: updated.createdAt,
      status: updated.status,
      access_reports: updated.access_reports,
      access_broadcasts: updated.access_broadcasts,
      access_settings: updated.access_settings,
      access_channels: updated.access_channels,
      access_accounts: updated.access_accounts,
      is_email_verified: updated.is_email_verified,
      passwordHash: updated.passwordHash,
      image: updated.image,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Delete user
export const deleteUserById = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUserById", async (id, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${USERS_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to delete user");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Count users
// export const countAllUsers = createAsyncThunk<number>(
//   "users/countAll",
//   async () => {
//     const res = await axios.get(`${USERS_URL}/count`);
//     return res.data.total;
//   },
// );

// ✅ Count all users
export const countAllUsers = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("users/countAllUsers", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (!token) {
      return rejectWithValue("No auth token");
    }

    const res = await fetch(`${USERS_URL}/count/userid/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to count users");
    }

    const data = await res.json();

    return data.total; // { total: number }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});




/* ======================================================
   Slice
====================================================== */

const initialState: UsersState = {
  users: [],
  allUsers: [],
  userCount: 0,
  selectedUser: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(updateUserById.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
        state.selectedUser = action.payload;
      })

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
        state.allUsers = state.allUsers.filter((u) => u.id !== action.payload);
      })

      // .addCase(countAllUsers.fulfilled, (state, action) => {
      //   state.userCount = action.payload;
      // });

      .addCase(countAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userCount = action.payload;
      })
      .addCase(countAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to count users";
      });

  },
});

export const { updateUser, deleteUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
