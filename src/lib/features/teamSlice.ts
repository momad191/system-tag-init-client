// src/lib/features/teamSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Base API URL and Endpoints
import { TEAMS_URL } from "@/config/apiConfig";

// ----------------------------
// Types
// ----------------------------
export interface TeamMember {
  _id: string;
  fullName: string;
  email: string;
  image?: string | null;
  mobile: string;
  role: string;
  type: string;
  status: string;
  access_reports: boolean;
  access_broadcasts: boolean;
  access_settings: boolean;
  access_channels: boolean;
  access_accounts: boolean;
  is_email_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  _id: string;
  name: string;
  provider: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Team {
  _id: string;
  name: string;
  members: TeamMember[];
  channels: Channel[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamsState {
  teams: Team[];
  selectedTeam: Team | null;
  TeamToDelete: Channel | null;
  //   teamToShow: Channel | null; // for show
  teamToShowId: string | null; // ✅ FIX
  loading: boolean;
  loadingTeamById: boolean; // ✅ NEW
  totalTeamsCount: number;  // ✅ NEW (from /teams/count)
  error: string | null;
  total: number;
  currentTeam: Team | null;
  memberTeams: Team[];
}

const initialState: TeamsState = {
  teams: [],
  selectedTeam: null,
  TeamToDelete: null,
  teamToShowId: null,
  loading: false,
  loadingTeamById: false, // ✅
  totalTeamsCount: 0,  // ✅
  error: null,
  total: 0,
  currentTeam: null,
  memberTeams: [],
};

// ----------------------------
// Async Thunks
// ----------------------------

// Fetch teams with search, pagination, sorting
export const fetchTeams = createAsyncThunk<
  { data: Team[]; total: number },
  {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  },
  { rejectValue: string }
>("teams/fetchTeams", async (params, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "name",
      sortOrder = "asc",
    } = params;

    const response = await axios.get(
      `${TEAMS_URL}?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Create team
export const createTeam = createAsyncThunk<
  Team,
  { name: string; members: string[]; channels: string[] },
  { rejectValue: string }
>("teams/createTeam", async (body, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(TEAMS_URL, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Update team
export const updateTeam = createAsyncThunk<
  Team,
  {
    id: string;
    body: { name?: string; members?: string[]; channels?: string[] };
  },
  { rejectValue: string }
>("teams/updateTeam", async ({ id, body }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.patch(`${TEAMS_URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Delete team
export const deleteTeam = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("teams/deleteTeam", async (id, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    await axios.delete(`${TEAMS_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchTeamById = createAsyncThunk(
  "team/fetchTeamById",
  async (teamId: string, thunkAPI) => {
    try {
      const response = await axios.get<Team>(`${TEAMS_URL}/${teamId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchTeamsByMemberId = createAsyncThunk(
  "team/fetchTeamsByMemberId",
  async (memberId: string, thunkAPI) => {
    try {
      const response = await axios.get<{ data: Team[]; total: number }>(
        `${TEAMS_URL}?memberId=${memberId}`,
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);


// ✅ Count all teams
export const countAllTeams = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("teams/countAllTeams", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    const response = await axios.get<{ total: number }>(
      `${TEAMS_URL}/count/userid/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.total;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message
    );
  }
});

 

// ----------------------------
// Slice
// ----------------------------
const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setSelectedTeam: (state, action: PayloadAction<Team | null>) => {
      state.selectedTeam = action.payload;
    },
    setTeamToDelete(state, action: PayloadAction<Channel | null>) {
      state.TeamToDelete = action.payload;
    },
    setTeamToShow(state, action: PayloadAction<string | null>) {
      state.teamToShowId = action.payload;
      state.currentTeam = null; // reset before fetch
    },

    clearTeamsState(state) {
      state.TeamToDelete = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Teams
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch teams";
    });

    // Create Team
    builder.addCase(createTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.teams.unshift(action.payload); // add new team at the top
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to create team";
    });

    // Update Team
    builder.addCase(updateTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.teams.findIndex(
        (team) => team._id === action.payload._id,
      );
      if (index !== -1) state.teams[index] = action.payload;
      if (state.selectedTeam?._id === action.payload._id)
        state.selectedTeam = action.payload;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update team";
    });

    // Delete Team
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = state.teams.filter((team) => team._id !== action.payload);
      if (state.selectedTeam?._id === action.payload) state.selectedTeam = null;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delete team";
    });

    // Fetch teams by member ID
    builder.addCase(fetchTeamsByMemberId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTeamsByMemberId.fulfilled,
      (state, action: PayloadAction<Team[]>) => {
        state.loading = false;
        state.memberTeams = action.payload;
      },
    );
    builder.addCase(
      fetchTeamsByMemberId.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    builder.addCase(fetchTeamById.pending, (state) => {
      state.loadingTeamById = true;
      state.error = null;
    });

    builder.addCase(
      fetchTeamById.fulfilled,
      (state, action: PayloadAction<Team>) => {
        state.loadingTeamById = false;
        state.currentTeam = action.payload;
      },
    );
    builder.addCase(fetchTeamById.rejected, (state, action) => {
      state.loadingTeamById = false;
      state.error = action.payload as string;
    })
    // ✅ Count all teams
    builder.addCase(countAllTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      countAllTeams.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.totalTeamsCount = action.payload;
      },
    );
    builder.addCase(
      countAllTeams.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );  
  },
});

export const {
  setSelectedTeam,
  clearTeamsState,
  setTeamToDelete,
  setTeamToShow,
} = teamSlice.actions;

export default teamSlice.reducer;
