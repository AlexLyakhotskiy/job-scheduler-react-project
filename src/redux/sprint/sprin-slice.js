import { createSlice } from '@reduxjs/toolkit';
import sprintOperations from './sprin-operations';

const initialState = {
  items: null,
  isLoading: false,
  titelProject: null,
  error: null,
};

const sprintSlice = createSlice({
  name: 'sprints',
  initialState,
  extraReducers: {
    // getSprint
    [sprintOperations.getSprint.pending](state, { payload }) {
      state.isLoading = true;
    },
    [sprintOperations.getSprint.fulfilled](state, { payload }) {
      state.items = payload.sprints;
      state.isLoading = false;
      state.isLogIn = true;
    },
    [sprintOperations.getSprint.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },

    // postSprint
    [sprintOperations.postSprint.pending](state, { payload }) {
      state.isLoading = true;
    },
    [sprintOperations.postSprint.fulfilled](state, { payload }) {
      state.items = [...state.items, payload];
      state.isLogIn = true;
      state.isLoading = false;
    },
    [sprintOperations.postSprint.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },

    // patchSprint
    [sprintOperations.patchSprint.pending](state, { payload }) {
      state.isLoading = true;
    },
    [sprintOperations.patchSprint.fulfilled](state, { payload }) {
      state.items.titel = payload.title;
      state.isLogIn = true;
      state.isLoading = false;
    },
    [sprintOperations.patchSprint.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },

    // delSprint
    [sprintOperations.delSprint.pending](state, { payload }) {
      state.isLoading = true;
    },
    [sprintOperations.delSprint.fulfilled](state, { payload }) {
      state.items = state.items.filter(({ _id }) => _id !== payload);
      state.isLogIn = true;
      state.isLoading = false;
    },
    [sprintOperations.patchSprint.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default sprintSlice.reducer;
