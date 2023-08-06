import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { volunteerTask } from "../redux/slice/taskSlice";
import {
  memberShip,
  registerVolunteer,
  selectUser,
} from "../redux/slice/manageUserTaskSlice";
import { useEffect, useState } from "react";
import axios from "../axios";

const VolunteerRegister = () => {
  const { id } = useParams();
  const allTask = useSelector(volunteerTask);
  const user = useSelector(selectUser);
  const [status, setStatus] = useState({ message: null, error: null });
  const item = allTask?.filter((item) => item._id === id);

  const [fullName, setFullName] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    const data = {
      fullName,
      usernameOrEmail,
      date,
      description,
      item: item[0],
    };

    dispatch(registerVolunteer(data));
    // Dispatch your action here with the data
    const postData = async () => {
      try {
        if (fullName && usernameOrEmail && date && description) {
          const response = await axios.post("/membership/add", {
            fullName,
            usernameOrEmail,
            date,
            description,
            item: item[0],
          });
          showStatus(response?.data?.message, response?.data?.error);
          setTimeout(() => {
            navigate("/events");
          }, 3000);
          // console.log("Post response:", response.data);
        } else return;

        // Handle success or redirect to another page
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    postData();
    e.preventDefault();
  };

  const showStatus = (message, error) => {
    setStatus({ message, error });

    // Clear status messages after 2 seconds
    setTimeout(() => {
      setStatus({ message: null, error: null });
    }, 2000);
  };
  return (
    <Container>
      <LogoContainer to={"/"}>
        <VolunteerLogo src="/logos/Group 1329.png" alt="web logo" />
      </LogoContainer>
      <RegisterForm onSubmit={(e) => handleRegister(e)}>
        <FormTitle>Register as Volunteer</FormTitle>
        <FormInput
          type="text"
          placeholder="full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <FormInput
          type="text"
          placeholder="username or email"
          defaultValue={
            usernameOrEmail == ""
              ? setUsernameOrEmail(user?.email)
              : usernameOrEmail
          }
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <FormInput
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <FormInput
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormInput type="text" disabled value={item[0]?.eventTitle} />
        <SubmitButton type="submit">Register</SubmitButton>
        <p style={{ color: "green" }}>{status?.message}</p>
        <p style={{ color: "red" }}>{status?.error}</p>
      </RegisterForm>
    </Container>
  );
};

export default VolunteerRegister;

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const LogoContainer = styled(Link)`
  margin-bottom: 10px;
`;

const VolunteerLogo = styled.img`
  object-fit: contain;
  max-height: 50px;
`;

const RegisterForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(145, 145, 145, 0.514);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  align-self: flex-start;
`;

const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 24px;
  padding: 5px 0;
  width: 100%;
  outline: none;
  font-size: 18px;

  &::placeholder {
    color: #000;
    opacity: 1;
    font-size: 15px;
  }
  &[type="date"] {
    font-size: 15px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;
