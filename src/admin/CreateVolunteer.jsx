import { styled } from "styled-components";
import AddEvent from "./AddEvent";
import CreateTaskform from "./CreateTaskform";

const CreateVolunteer = () => {
  return (
    <Container>
      <AddEvent />
      <CreateTaskform />
    </Container>
  );
};

export default CreateVolunteer;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
  height: 100%;
`;
