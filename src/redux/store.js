import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./slice/Jobslice"; // Düzeltme: Jobslice yerine JobSlice

export default configureStore({
  reducer: {
    jobSlice: JobSlice // Düzeltme: Reducer'ı doğru anahtarla geçirin
  }
});
