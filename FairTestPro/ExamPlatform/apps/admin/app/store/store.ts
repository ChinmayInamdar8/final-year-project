"use client"
import { configureStore } from "@reduxjs/toolkit";
import examIdReducer from "./slices/ExamId"


export const store = configureStore({
  reducer: {
    exam:examIdReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
