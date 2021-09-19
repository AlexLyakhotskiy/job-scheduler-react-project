import { createSlice } from '@reduxjs/toolkit';
import { filterByDate, filterChange } from './tasks-actions';
import { addTask, deleteTask, editTask, fetchTasks } from './tasks-operations';

const initialState = {
  allTasks: [],
  filter: '',
  error: null,
  loading: false,
  filteredTasksByDate: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: {
    [addTask.pending](state) {
      state.loading = true;
    },
    [addTask.fulfilled](state, { payload }) {
      state.error = null;
      state.allTasks.push(payload);
      state.loading = false;
    },
    [addTask.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [fetchTasks.pending](state) {
      state.loading = true;
    },
    [fetchTasks.fulfilled](state, { payload }) {
      state.error = null;
      state.allTasks = payload;
      state.loading = false;
    },
    [fetchTasks.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [deleteTask.pending](state) {
      state.loading = true;
    },
    [deleteTask.fulfilled](state, { payload }) {
      state.error = null;
      const removeIndex = state.allTasks.findIndex(({ id }) => id === payload);
      console.log(`removeIndex`, removeIndex);
      state.allTasks.splice(removeIndex, 1);
      state.loading = false;
    },
    [deleteTask.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [editTask.pending](state) {
      state.loading = true;
    },
    [editTask.fulfilled](state, { payload }) {
      state.error = null;
      const editIndex = state.allTasks.findIndex(({ id }) => id === payload.id);
      let editTask = state.allTasks[editIndex];
      const newHoursWastedPerDay = editTask.hoursWastedPerDay.map(day => {
        if (day.currentDay === payload.date) {
          return { ...day, singleHoursWasted: payload.hours };
        }
        return day;
      });
      const newHoursWasted =
        Number(editTask.hoursWasted) + Number(payload.hours);
      editTask = {
        ...editTask,
        hoursWastedPerDay: newHoursWastedPerDay,
        hoursWasted: newHoursWasted,
      };
      state.allTasks[editIndex] = editTask;
      console.log(`editTask`, editTask);
      state.loading = false;
    },
    [editTask.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [filterChange](state, { payload }) {
      state.filter = payload;
    },
    [filterByDate](state, { payload }) {
      state.filteredTasksByDate = payload;
    },
  },
});

export default tasksSlice.reducer;