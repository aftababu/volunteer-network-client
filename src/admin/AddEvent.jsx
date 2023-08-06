import { Link } from "react-router-dom";
import { styled } from "styled-components";
// import { Plus } from "react-icons";

const AddEvent = () => {
  return (
    <Container>
      <Sidebar>
        <Link to={"/"}>
          <VolunteerLogo src="/logos/Group 1329.png" alt="web logo" />
        </Link>
        <TextContainer>
          <Link to={"/admin/displaytask"}>
            <Text>Volunteer register List</Text>
          </Link>
        </TextContainer>
        <A to={"/admin/createvolunteer"}>
          <TextContainer>
            <Icon>+</Icon>
            <BlueText>Add Event</BlueText>
          </TextContainer>
        </A>
      </Sidebar>
    </Container>
  );
};

export default AddEvent;

const Container = styled.div`
  margin: 0;
  margin-left: 20px;
  max-width: 30vw;
  min-width: 20vw;
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  row-gap: 30px;
`;

const VolunteerLogo = styled.img`
  object-fit: contain;
  max-height: 50px;
  margin-bottom: 10px;
`;

const TextContainer = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Text = styled.p``;

const Icon = styled.div`
  color: blue;
`;

const BlueText = styled.p`
  color: blue;
  font-size: 0.9rem;
`;
const A = styled(Link)`
  padding: 10px 1.5rem;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  &:hover {
    background-color: #cdcdff95;
  }
  ${TextContainer} {
    cursor: pointer;
  }
`;
