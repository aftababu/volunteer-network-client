import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slice/taskSlice";
import manageUserTaskSlice from "./slice/manageUserTaskSlice";

export const store = configureStore({
  reducer: {
    task: taskSlice,
    userTask: manageUserTaskSlice,
  },
});
