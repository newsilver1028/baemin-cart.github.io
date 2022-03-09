import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchFoodData = createAsyncThunk(
  'fetchFoodData', 
  async (_,thunkAPI) => {
    try {
      const response = await axios.get("https://us-central1-react-baemin.cloudfunctions.net/merchantInfo")
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
