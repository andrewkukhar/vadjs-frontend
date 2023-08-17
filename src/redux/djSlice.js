import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: '',
  name: '',
  genres: [],
  bio: '',
  fullBio: '',
  yearsActive: '',
  upcomingEvents: [],
  socialMediaLinks: {}
};

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
  }
});

export const { setDjData, updateDjField, addSocialMediaLink, removeSocialMediaLink } = djSlice.actions;

export const selectDjData = state => state.djData;

export default djSlice.reducer;
