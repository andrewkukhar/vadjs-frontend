import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  djsList: [],
  loading: false,
  image: {
    url: '',
    public_id: ''
  },

  name: '',
  genres: [],
  bio: '',
  fullBio: '',
  yearsActive: '',
  upcomingEvents: [],
  socialMediaLinks: {}
};

export const fetchDjs = createAsyncThunk('djData/fetchDjs', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/djs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching DJ data:", error);
    throw error;
  }
});

export const djSlice = createSlice({
  name: 'djData',
  initialState,
  reducers: {
    setDjData: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateDjField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addSocialMediaLink: (state, action) => {
      const { platform, link } = action.payload;
      state.socialMediaLinks[platform] = link;
    },
    removeSocialMediaLink: (state, action) => {
      const platform = action.payload;
      delete state.socialMediaLinks[platform];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDjs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDjs.fulfilled, (state, action) => {
        state.djsList = action.payload;
        state.loading = false;
      })
      .addCase(fetchDjs.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { 
  setDjData, 
  updateDjField, 
  addSocialMediaLink, 
  removeSocialMediaLink 
} = djSlice.actions;

export const selectDjData = state => state.djData;

export default djSlice.reducer;
