import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* =========================
   Types
========================= */

export interface Contact {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ContactsState {
  contacts: Contact[];
  contactToDelete: Contact | null; // ✅ NEW
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  currentContact: Contact | null;
    contactCount: number; // ✅ NEW

  loading: boolean;
  loadingById: boolean;
  error: string | null;
}

/* =========================
   Initial State
========================= */

const initialState: ContactsState = {
  contacts: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  currentContact: null,
  contactToDelete: null, // ✅
   contactCount: 0, // ✅ NE
  loading: false,
  loadingById: false,
  error: null,
};

/* =========================
   API URL
========================= */

import { CONTACTS_URL } from "@/config/apiConfig";

/* =========================
   Thunks
========================= */

/* ---- Create Contact ---- */
export const createContact = createAsyncThunk<
  Contact,
  { name: string; mobile: string; email: string },
  { rejectValue: string }
>("contacts/createContact", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.post<Contact>(CONTACTS_URL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Update Contact ---- */
export const updateContact = createAsyncThunk<
  Contact,
  { id: string; body: { name: string; mobile: string; email: string } },
  { rejectValue: string }
>("contacts/updateContact", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    const res = await axios.patch<Contact>(`${CONTACTS_URL}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Delete Contact ---- */
export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contacts/deleteContact", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");

    await axios.delete(`${CONTACTS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Get Contacts (with pagination & search) ---- */
export const fetchContacts = createAsyncThunk<
  ContactsResponse,
  { page?: number; limit?: number; search?: string },
  { rejectValue: string }
>("contacts/fetchContacts", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;

    const res = await axios.get<ContactsResponse>(CONTACTS_URL, {
      params: { page, limit, search },
    });

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* ---- Get Contact By ID ---- */
export const fetchContactById = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contacts/fetchContactById", async (id, thunkAPI) => {
  try {
    const res = await axios.get<Contact>(`${CONTACTS_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});


/* ---- Count Contacts ---- */
export const countAllContacts = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("contacts/countAllContacts", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    const res = await axios.get<{ total: number }>(
      `${CONTACTS_URL}/count/userid/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.total;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});


/* =========================
   Slice
========================= */

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearCurrentContact(state) {
      state.currentContact = null;
    },

    setContactToDelete(state, action: PayloadAction<Contact | null>) {
      state.contactToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== Create ===== */
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create contact";
      })

      /* ===== Update ===== */
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.contacts.findIndex(
          (c) => c._id === action.payload._id,
        );

        if (index !== -1) {
          state.contacts[index] = action.payload;
        }

        state.currentContact = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update contact";
      })

      /* ===== Delete ===== */
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c._id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete contact";
      })

      /* ===== Fetch All ===== */
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch contacts";
      })

      /* ===== Fetch By ID ===== */
      .addCase(fetchContactById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.currentContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload || "Failed to fetch contact";
      })
            /* ===== Count ===== */
      .addCase(countAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contactCount = action.payload;
      })
      .addCase(countAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to count contacts";
      });
      
  },
});

/* =========================
   Exports
========================= */

export const { clearCurrentContact, setContactToDelete } = contactSlice.actions;
export default contactSlice.reducer;
