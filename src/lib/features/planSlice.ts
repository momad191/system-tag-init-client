import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { PLANS_URL } from "@/config/apiConfig";
/* =========================
   Types
========================= */ 
   
export interface Plan {
  _id: string;
  name: string;
  price: number;
  period: string;
  maxUsers: number;
  maxWhatsApp: number;
  maxEmails: number;
  maxDirectMessages: number;
  start_date?: string;
  end_date?: string;
  createdAt: string;
  updatedAt: string;
}

interface PlansResponse {
  data: Plan[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PlansState {
  plans: Plan[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  currentPlan: Plan | null;
  planToEditId?: string | null;

  loading: boolean;
  loadingById: boolean;
  error: string | null;
}

/* =========================
   Initial State
========================= */

const initialState: PlansState = {
  plans: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  currentPlan: null,
  loading: false,
  loadingById: false,
  error: null,
  planToEditId: null,
};

/* =========================
   API URL
========================= */


 
/* =========================
   Thunks
========================= */

/* ---- Create Plan ---- */
export const createPlan = createAsyncThunk<
  Plan,
  Omit<Plan, "_id" | "createdAt" | "updatedAt">,
  { rejectValue: string }
>("plans/createPlan", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.post<Plan>(PLANS_URL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Update Plan ---- */
export const updatePlan = createAsyncThunk<
  Plan,
  { id: string; body: Partial<Plan> },
  { rejectValue: string }
>("plans/updatePlan", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.patch<Plan>(`${PLANS_URL}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Delete Plan ---- */
export const deletePlan = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("plans/deletePlan", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    await axios.delete(`${PLANS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Plans (pagination & search) ---- */
export const fetchPlans = createAsyncThunk<
  PlansResponse,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>("plans/fetchPlans", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;

    const res = await axios.get<PlansResponse>(PLANS_URL, {
      params: { page, limit, search },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Plan By ID ---- */
export const fetchPlanById = createAsyncThunk<
  Plan,
  string,
  { rejectValue: string }
>("plans/fetchPlanById", async (id, thunkAPI) => {
  try {
    const res = await axios.get<Plan>(`${PLANS_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* =========================
   Slice
========================= */

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    clearCurrentPlan(state) {
      state.currentPlan = null;
    },
    setPlanToEdit(state, action) {
      state.planToEditId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      /* ===== Create ===== */
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create plan";
      })

      /* ===== Update ===== */
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.plans.findIndex(
          (p) => p._id === action.payload._id,
        );

        if (index !== -1) {
          state.plans[index] = action.payload;
        }

        state.currentPlan = action.payload;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update plan";
      })
      /* ===== Delete ===== */
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(
          (plan) => plan._id !== action.payload,
        );
        state.total -= 1;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete plan";
      })
      /* ===== Fetch All ===== */
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch plans";
      })

      /* ===== Fetch By ID ===== */
      .addCase(fetchPlanById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchPlanById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload || "Failed to fetch plan";
      });
  },
});

/* =========================
   Exports
========================= */

export const { clearCurrentPlan, setPlanToEdit } = planSlice.actions;
export default planSlice.reducer;  
