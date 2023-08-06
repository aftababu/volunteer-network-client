import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "Task",
  initialState: {
    taskItem: [],
    success: "",
  },
  reducers: {
    setTaskItem: (state, action) => {
      state.taskItem = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const { setTaskItem, setSuccess } = taskSlice.actions;
export const volunteerTask = (state) => state.task.taskItem;

export default taskSlice.reducer;
