import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { REPLIES_URL } from "@/config/apiConfig";
 
/* =========================
   Types
========================= */
export interface ReplyUser {
  _id: string;
  fullName: string;
  image: string;
  email: string;
  mobile: string;
  role: string;
  provider: string;
  socialId?: string;
  type?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface Reply {
  _id: string;
  userId?: string | ReplyUser;
  title: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface RepliesResponse {
  data: Reply[];
  total: number;
  page: number;
  limit: number;
}

interface RepliesState {
  replies: Reply[];
  total: number;
  page: number;
  limit: number;

  currentReply: Reply | null;

  loading: boolean;
  loadingById: boolean;
  error: string | null;
}

/* =========================
   Initial State
========================= */
const initialState: RepliesState = {
  replies: [],
  total: 0,
  page: 1,
  limit: 10,
  currentReply: null,
  loading: false,
  loadingById: false,
  error: null,
};

/* =========================
   Thunks
========================= */

/* ---- Create Reply ---- */
export const createReply = createAsyncThunk<
  Reply,
  { userId: string; title: string; message: string },
  { rejectValue: string }
>("replies/createReply", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post<Reply>(REPLIES_URL, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Update Reply ---- */
export const updateReply = createAsyncThunk<
  Reply,
  { id: string; body: Partial<Reply> },
  { rejectValue: string }
>("replies/updateReply", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.patch<Reply>(`${REPLIES_URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Delete Reply ---- */
export const deleteReply = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("replies/deleteReply", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    await axios.delete(`${REPLIES_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Replies (pagination + search) ---- */
export const fetchReplies = createAsyncThunk<
  RepliesResponse,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>("replies/fetchReplies", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;
    const res = await axios.get<RepliesResponse>(REPLIES_URL, {
      params: { page, limit, search },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Reply by ID ---- */
export const fetchReplyById = createAsyncThunk<
  Reply,
  string,
  { rejectValue: string }
>("replies/fetchReplyById", async (id, thunkAPI) => {
  try {
    const res = await axios.get<Reply>(`${REPLIES_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* =========================
   Slice
========================= */

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    clearCurrentReply(state) {
      state.currentReply = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---- Create ---- */
      .addCase(createReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loading = false;
        state.replies.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create reply";
      })

      /* ---- Update ---- */
      .addCase(updateReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.replies.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.replies[index] = action.payload;
        state.currentReply = action.payload;
      })
      .addCase(updateReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update reply";
      })

      /* ---- Delete ---- */
      .addCase(deleteReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = state.replies.filter((r) => r._id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete reply";
      })

      /* ---- Fetch all ---- */
      .addCase(fetchReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch replies";
      })

      /* ---- Fetch by ID ---- */
      .addCase(fetchReplyById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchReplyById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentReply = action.payload;
      })
      .addCase(fetchReplyById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload || "Failed to fetch reply";
      });
  },
});

/* =========================
   Exports
========================= */
export const { clearCurrentReply } = replySlice.actions;
export default replySlice.reducer;
