import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddProject,
  apiRemoveProjectById,
  apiGetProjects,
  apiChangeProjectTitleById,
} from '../../utils/apiServices.js';

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (_, { rejectWithValue }) => {
    try {
      const projectsGet = await apiGetProjects();
      return Array.isArray(projectsGet) ? projectsGet : [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addProjects = createAsyncThunk(
  'projects/addProjects',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = await apiAddProject({ title, description });
      return { _id: id, ...rest };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteProjects = createAsyncThunk(
  'projects/deleteProjects',
  async (projectsId, { rejectWithValue }) => {
    try {
      await apiRemoveProjectById(projectsId);
      return projectsId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const patchProject = createAsyncThunk(
  'projects/changeProject',
  async ({ projectId, titleData }, { rejectWithValue }) => {
    try {
      const projectsEdit = await apiChangeProjectTitleById(
        projectId,
        titleData,
      );
      return { title: projectsEdit.newTitle, projectId };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
