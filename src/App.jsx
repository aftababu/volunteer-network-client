import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Displaytask from "./admin/Displaytask";
import CreateVolunteer from "./admin/CreateVolunteer";
import { styled } from "styled-components";
import { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess, setTaskItem } from "./redux/slice/taskSlice";
import Register from "./components/Register";
import { auth } from "./firebase.config";
import { userTask } from "./redux/slice/manageUserTaskSlice";
import VolunteerRegister from "./components/VolunteerRegister";
import PrivateRouteForLogin from "./components/PrivateRouteForLogin";
import Events from "./components/Events";

function App() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.task.success);
  const location = useLocation();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/get/events"); // Make a GET request to fetch events
        dispatch(setTaskItem(response.data));
        // setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
    if (message === "Event created successfully") {
      dispatch(setSuccess(""));
      console.log("Successly reloading");
    }
    auth.onAuthStateChanged((authUser) => {
      // console.log('the user is >>>>', authUser);
      if (authUser) {
        //  the user just logged in / the user was logged in
        const { accessToken, displayName, email, photoURL, uid } = authUser;
        dispatch(userTask({ accessToken, displayName, email, photoURL, uid }));
      } else {
        // the user is logged out
        dispatch(userTask(null));
      }
    });
  }, [message, dispatch]);

  console.log(useSelector((state) => state));
  return (
    <>
      <BgImg
        src={
          location.pathname == "/" &&
          "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dm9sdW50ZWVyJTIwbmV0d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
        alt=""
      />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/displaytask" element={<Displaytask />} />
          <Route path="/admin/createvolunteer" element={<CreateVolunteer />} />

          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRouteForLogin />}>
            <Route path="/task/:id" element={<VolunteerRegister />} />
          </Route>
          <Route path="/events" element={<Events />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

const BgImg = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  opacity: 0.1; /* Opacity for the background image */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Place the background image behind the overlay */
`;

const Container = styled.div`
  margin: 0 auto;
`;
