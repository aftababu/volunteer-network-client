import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../redux/slice/manageUserTaskSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { from } = location?.state || { from: "/" };
  useEffect(() => {
    if (user?.email) {
      navigate(from);
    }
  }, [user?.email]);
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then(() => {
        navigate(from);
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <Conatiner>
      <Link to={"/"}>
        <VolunteerLogo src="/logos/Group 1329.png" alt="web logo" />
      </Link>
      <LogInContainer className="login-container">
        <h2>Login with </h2>
        <Button onClick={handleGoogleSignIn}>continue with Google</Button>
      </LogInContainer>
    </Conatiner>
  );
};

export default Register;

const VolunteerLogo = styled.img`
  object-fit: contain;
  max-height: 50px;
  margin-bottom: 10px;
`;

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const LogInContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 0;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: 60%;

  &:hover {
    background-color: #357ae8;
  }
`;
