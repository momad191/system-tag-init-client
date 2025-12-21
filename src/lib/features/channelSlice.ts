import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { CHANNELS_URL } from "@/config/apiConfig";

/* ======================================================
   Types
====================================================== */

export type ChannelProvider = "whatsapp" | "facebook" | "email" | "custom";

export interface ChannelUser {
  id: string;
  fullName: string;
  email: string;
  mobile?: string;
  role: string;
}

export interface ChannelCredentials {
  phone_number_id?: string;
  phone_number?: string;
  business_account_id?: string;
  app_id?: string;
  token?: string;
}

export interface ChannelMeta {
  email?: string;
}

export interface Channel {
  id: string;
  userId: ChannelUser;
  provider: ChannelProvider;
  name: string;
  automated_reply?: string;
  credentials?: ChannelCredentials;
  meta?: ChannelMeta;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ======================================================
   State
====================================================== */

interface ChannelsState {
  channels: Channel[];
  selectedChannel: Channel | null; // for edit
  channelToDelete: Channel | null; // for delete
  channelToShow: Channel | null; // for show
  loading: boolean;
  error: string | null;
}

/* ======================================================
   Async Thunks
====================================================== */

// ✅ Fetch all channels
export const fetchChannels = createAsyncThunk<
  Channel[],
  void,
  { rejectValue: string }
>("channels/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(CHANNELS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return rejectWithValue(err);
    }

    const data = await res.json();

    return data.map((c: any): Channel => ({
      id: c._id,
      userId: {
        id: c.userId._id,
        fullName: c.userId.fullName,
        email: c.userId.email,
        mobile: c.userId.mobile,
        role: c.userId.role,
      },
      provider: c.provider,
      name: c.name,
      automated_reply: c.automated_reply,
      credentials: c.credentials,
      meta: c.meta,
      isActive: c.isActive,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Create channel
export const createChannel = createAsyncThunk<
  Channel,
  {
    userId: string;
    provider: ChannelProvider;
    name: string;
    automated_reply?: string;
    credentials?: ChannelCredentials;
    meta?: ChannelMeta;
    isActive: boolean;
  },
  { rejectValue: string }
>("channels/create", async (payload, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(CHANNELS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to create channel");
    }

    const c = await res.json();

    return {
      id: c._id,
      userId: {
        id: c.userId._id,
        fullName: c.userId.fullName,
        email: c.userId.email,
        mobile: c.userId.mobile,
        role: c.userId.role,
      },
      provider: c.provider,
      name: c.name,
      automated_reply: c.automated_reply,
      credentials: c.credentials,
      meta: c.meta,
      isActive: c.isActive,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Delete channel
export const deleteChannelById = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("channels/delete", async (id, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${CHANNELS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to delete channel");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Update channel
export const updateChannel = createAsyncThunk<
  Channel,
  { id: string; dto: Partial<Channel> },
  { rejectValue: string }
>(
  "channels/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`${CHANNELS_URL}/${id}`, {
        method: "PUT", // PUT for full replace, or PATCH if you prefer
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to update channel");
      }

      const c = await res.json();

      return {
        id: c._id,
        userId: {
          id: c.userId._id,
          fullName: c.userId.fullName,
          email: c.userId.email,
          mobile: c.userId.mobile,
          role: c.userId.role,
        },
        provider: c.provider,
        name: c.name,
        automated_reply: c.automated_reply,
        credentials: c.credentials,
        meta: c.meta,
        isActive: c.isActive,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



/* ======================================================
   Slice
====================================================== */

const initialState: ChannelsState = {
  channels: [],
  selectedChannel: null,
  channelToDelete: null,
  channelToShow: null,
  loading: false,
  error: null,
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {

    setSelectedChannel(state, action: PayloadAction<Channel | null>) {
      state.selectedChannel = action.payload;
    },
    setChannelToDelete(state, action: PayloadAction<Channel | null>) {
      state.channelToDelete = action.payload;
    },
    setChannelToShow(state, action: PayloadAction<Channel | null>) {
      state.channelToShow = action.payload;
    },

    clearChannelsState(state) {
      state.selectedChannel = null;
      state.channelToDelete = null;
      state.channelToShow = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Create
      .addCase(createChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload);
      })


      // Update channel
      .addCase(updateChannel.fulfilled, (state, action) => {
        const index = state.channels.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.channels[index] = action.payload;
        }
      })
      
      // Delete
      .addCase(deleteChannelById.fulfilled, (state, action) => {
        state.channels = state.channels.filter(
          (c) => c.id !== action.payload,
        );
      });
  },
});

export const { setSelectedChannel, setChannelToDelete, setChannelToShow, clearChannelsState } =
  channelSlice.actions;

export default channelSlice.reducer;
