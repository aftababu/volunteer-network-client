import AddEvent from "./AddEvent";
import { styled } from "styled-components";

const Displaytask = () => {
  return (
    <Container>
      <AddEvent />
      <CreateVolunteerFormContainer>
        <Label>Add Event</Label>
        <CreateVolunteerForm>
          <CreateTask>
            <h1>heelllo</h1>
          </CreateTask>
        </CreateVolunteerForm>
      </CreateVolunteerFormContainer>
    </Container>
  );
};

export default Displaytask;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
  height: 100%;
`;

const CreateVolunteerFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f4f7fc;
  /* max-width: 75vw; */
  height: calc(100vh - 30px);
  width: -moz-available;
  margin-left: 10px;
`;

const Label = styled.h2`
  background-color: #fff;
  height: 80px;
  color: #111;
  font-weight: 500;
  padding-left: 1.5rem;
`;

const CreateVolunteerForm = styled.div`
  padding: 2.5rem 2rem;
`;

const CreateTask = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4vw;
  row-gap: 1rem;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  label {
    font-weight: 600;
  }
  input,
  textarea {
    padding: 5px;
    color: #111;
    line-height: 1.6;
    border: 1px solid rgba(179, 179, 179, 0.589);
  }
`;
