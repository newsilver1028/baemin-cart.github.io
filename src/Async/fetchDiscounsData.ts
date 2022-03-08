import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export interface FoodDataError{
  errorMessage: string;
}

export const fetchDiscountsData = createAsyncThunk(
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
