import { createSlice } from "@reduxjs/toolkit";

const manageUsertaskSlice = createSlice({
  name: "Usertask",
  initialState: {
    user: null,
    memberShip: [],
  },
  reducers: {
    userTask: (state, action) => {
      state.user = action.payload;
    },
    registerVolunteer: (state, action) => {
      const filter = state.memberShip.filter(
        (item) => item.item._id !== action.payload.item._id
      );
      return { ...state, memberShip: [...filter, action.payload] };
    },
  },
});

export const { userTask, registerVolunteer } = manageUsertaskSlice.actions;
export const selectUser = (state) => state.userTask.user;
export const memberShip = (state) => state.userTask.memberShip;

export default manageUsertaskSlice.reducer;
