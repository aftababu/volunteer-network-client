import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slice/manageUserTaskSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouteForLogin = () => {
  const user = useSelector(selectUser);
  const location = useLocation();
  console.log(user);
  return user?.email ? (
    <Outlet />
  ) : (
    <Navigate to={"/register"} state={{ from: location }} replace />
  );
};

export default PrivateRouteForLogin;
