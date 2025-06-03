"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const ExamIdSlice = createSlice({
  name: "exam",
  initialState: { value: "" },
  reducers: {
    setExamId: (state, action:PayloadAction<string>)=>{
        state.value = action.payload;
    }
  },
});

export const { setExamId } = ExamIdSlice.actions;
export default ExamIdSlice.reducer;
