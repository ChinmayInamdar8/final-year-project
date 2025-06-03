"use client"
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/CounterSlice.ts";
import examIdReducer from "./slices/ExamId.ts"


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    exam:examIdReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
