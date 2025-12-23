import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { OUTCOMES_URL } from "@/config/apiConfig";

/* =========================
   Types
========================= */ 
export interface Outcome {
  _id: string;
  userId?: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface OutcomesResponse {
  data: Outcome[];
  total: number;
  page: number;
  limit: number;
}

interface OutcomeState {
  outcomes: Outcome[];
  total: number;
  page: number;
  limit: number;

  currentOutcome: Outcome | null;

  loading: boolean;
  loadingById: boolean;
  error: string | null;
}

/* =========================
   Initial State
========================= */
const initialState: OutcomeState = {
  outcomes: [],
  total: 0,
  page: 1,
  limit: 10,
  currentOutcome: null,
  loading: false,
  loadingById: false,
  error: null,
};

/* =========================
   Thunks
========================= */

/* ---- Create Outcome ---- */
export const createOutcome = createAsyncThunk<
  Outcome,
  { userId: string; name: string; description: string },
  { rejectValue: string }
>("outcomes/createOutcome", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post<Outcome>(OUTCOMES_URL, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

/* ---- Update Outcome ---- */
export const updateOutcome = createAsyncThunk<
  Outcome,
  { id: string; body: Partial<Outcome> },
  { rejectValue: string }
>("outcomes/updateOutcome", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.patch<Outcome>(`${OUTCOMES_URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

/* ---- Delete Outcome ---- */
export const deleteOutcome = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("outcomes/deleteOutcome", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    await axios.delete(`${OUTCOMES_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

/* ---- Fetch Outcomes (Pagination + Search) ---- */
export const fetchOutcomes = createAsyncThunk<
  OutcomesResponse,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>("outcomes/fetchOutcomes", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;
    const res = await axios.get<OutcomesResponse>(OUTCOMES_URL, {
      params: { page, limit, search },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

/* ---- Fetch Outcome by ID ---- */
export const fetchOutcomeById = createAsyncThunk<
  Outcome,
  string,
  { rejectValue: string }
>("outcomes/fetchOutcomeById", async (id, thunkAPI) => {
  try {
    const res = await axios.get<Outcome>(`${OUTCOMES_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

/* =========================
   Slice
========================= */
const outcomeSlice = createSlice({
  name: "outcomes",
  initialState,
  reducers: {
    clearCurrentOutcome(state) {
      state.currentOutcome = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---- Create ---- */
      .addCase(createOutcome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOutcome.fulfilled, (state, action) => {
        state.loading = false;
        state.outcomes.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create outcome";
      })

      /* ---- Update ---- */
      .addCase(updateOutcome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOutcome.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.outcomes.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) state.outcomes[index] = action.payload;
        state.currentOutcome = action.payload;
      })
      .addCase(updateOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update outcome";
      })

      /* ---- Delete ---- */
      .addCase(deleteOutcome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOutcome.fulfilled, (state, action) => {
        state.loading = false;
        state.outcomes = state.outcomes.filter(
          (o) => o._id !== action.payload
        );
        state.total -= 1;
      })
      .addCase(deleteOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete outcome";
      })

      /* ---- Fetch All ---- */
      .addCase(fetchOutcomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutcomes.fulfilled, (state, action) => {
        state.loading = false;
        state.outcomes = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchOutcomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch outcomes";
      })

      /* ---- Fetch By ID ---- */
      .addCase(fetchOutcomeById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchOutcomeById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentOutcome = action.payload;
      })
      .addCase(fetchOutcomeById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload || "Failed to fetch outcome";
      });
  },
});

/* =========================
   Exports
========================= */
export const { clearCurrentOutcome } = outcomeSlice.actions;
export default outcomeSlice.reducer;
