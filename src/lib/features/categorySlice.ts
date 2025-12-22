import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { CATEGORIES_URL } from "@/config/apiConfig"; 

/* =========================
   Types
========================= */

export interface Category {
  _id: string;
  userId?: string;
  name: string;
  description: string;
  color_code: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface CategoriesResponse {
  results: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CategoriesState {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  currentCategory: Category | null;
  categoryToEditId?: string | null;

  loading: boolean;
  loadingById: boolean;
  error: string | null;
}

/* =========================
   Initial State
========================= */

const initialState: CategoriesState = {
  categories: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  currentCategory: null,
  categoryToEditId: null,
  loading: false,
  loadingById: false,
  error: null,
};

/* =========================
   Thunks
========================= */

/* ---- Create Category ---- */
export const createCategory = createAsyncThunk<
  Category,
  Omit<Category, "_id" | "createdAt" | "updatedAt" | "__v">,
  { rejectValue: string }
>("categories/createCategory", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.post<Category>(CATEGORIES_URL, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Update Category ---- */
export const updateCategory = createAsyncThunk<
  Category,
  { id: string; body: Partial<Category> },
  { rejectValue: string }
>("categories/updateCategory", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.patch<Category>(`${CATEGORIES_URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Delete Category ---- */
export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categories/deleteCategory", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    await axios.delete(`${CATEGORIES_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Categories (pagination + search) ---- */
export const fetchCategories = createAsyncThunk<
  CategoriesResponse,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>("categories/fetchCategories", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;

    const res = await axios.get<CategoriesResponse>(CATEGORIES_URL, {
      params: { page, limit, search },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Fetch Category by ID ---- */
export const fetchCategoryById = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>("categories/fetchCategoryById", async (id, thunkAPI) => {
  try {
    const res = await axios.get<Category>(`${CATEGORIES_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* =========================
   Slice
========================= */

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCurrentCategory(state) {
      state.currentCategory = null;
    },
    setCategoryToEdit(state, action) {
      state.categoryToEditId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---- Create ---- */
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
      })

      /* ---- Update ---- */
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
        state.currentCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update category";
      })

      /* ---- Delete ---- */
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((c) => c._id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete category";
      })

      /* ---- Fetch all ---- */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })

      /* ---- Fetch by ID ---- */
      .addCase(fetchCategoryById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload || "Failed to fetch category";
      });
  },
});

/* =========================
   Exports
========================= */

export const { clearCurrentCategory, setCategoryToEdit } = categorySlice.actions;
export default categorySlice.reducer;
