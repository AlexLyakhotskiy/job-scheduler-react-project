/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://sbc-backend.goit.global';
axios.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUyOTU2OGI5YjMxYzAwMTc2MjQ3YTQiLCJzaWQiOiI2MTQ0MmZhZGY0YTZjMDNkYjhjYzhjNDQiLCJpYXQiOjE2MzE4NTg2MDUsImV4cCI6MTYzMTg2MjIwNX0.1dBClHReJkn1re7V1a06UpHYNjNxPk8Kap-KpAWiKXQ';

const getProject = createAsyncThunk('/project/getProject', async () => {
  try {
    const { data } = await axios.get(`/project`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const postSprint = createAsyncThunk(
  '/sprint/postSprint',
  async ({ id, body }) => {
    try {
      const { data } = await axios.post(`/sprint/${id}`, body);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
);

const getSprint = createAsyncThunk('/sprint/getSprint', async id => {
  try {
    const { data } = await axios.get(`/sprint/${id}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const patchSprint = createAsyncThunk('/sprint/patchSprint}', async ({ id }) => {
  try {
    const { data } = await axios.patch(`/sprint/title/${id}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const delSprint = createAsyncThunk('/sprint', async id => {
  try {
    const { data } = await axios.delete(`/sprint/${id}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const sprintOperations = {
  getProject,
  postSprint,
  getSprint,
  patchSprint,
  delSprint,
};

export default sprintOperations;
