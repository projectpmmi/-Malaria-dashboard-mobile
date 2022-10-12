import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData1: null,
    chartData2: null,
    chartData3: null,
  },
  reducers: {
    setChartData1: (state, action) => {
      state.chartData1 = action.payload;
    },
    deleteChartData1: (state, { payload }) => {
      state.chartData1 = null;
    },
    setChartData2: (state, action) => {
      state.chartData2 = action.payload;
    },
    deleteChartData2: (state, { payload }) => {
      state.chartData2 = null;
    },
    setChartData3: (state, action) => {
      state.chartData3 = action.payload;
    },
    deleteChartData3: (state, { payload }) => {
      state.chartData3 = null;
    },
  },
});

export const {
  setChartData1,
  setChartData2,
  setChartData3,
  deleteChartData1,
  deleteChartData2,
  deleteChartData3,
} = chartSlice.actions;
export default chartSlice.reducer;
