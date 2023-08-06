import axios from "../axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setSuccess } from "../redux/slice/taskSlice";

const CreateTaskform = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: null, error: null });

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    description: "",
    banner: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: null, error: null });
    try {
      const res = await axios.post("/api/events", formData); // Make a POST request to the backend API
      // Clear the form or show a success message
      console.log(res);
      if (res.status === 201) {
        const { message } = res.data;
        // setSuccessMessage(message);
        showStatus(message, null);
        dispatch(setSuccess(message));
        setFormData({
          eventTitle: "",
          eventDate: "",
          description: "",
          banner: "",
        });
      } else {
        const { error } = res.data;
        showStatus(null, error);
      }
    } catch (error) {
      console.error("Error creating event", error);
      showStatus(null, "Error creating event");
      // Handle error, show error message, etc.
    } finally {
      setSubmitting(false);
    }
  };
  const showStatus = (message, error) => {
    setStatus({ message, error });

    // Clear status messages after 2 seconds
    setTimeout(() => {
      setStatus({ message: null, error: null });
    }, 3000);
  };
  // console.log(status);
  return (
    <>
      <CreateVolunteerFormContainer onSubmit={handleSubmit}>
        <Label>Add Event</Label>
        <CreateVolunteerForm>
          <CreateTask>
            <FormInput>
              <label>Event Title</label>
              <input
                type="text"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleChange}
                placeholder="Event title"
                required
              />
            </FormInput>
            <FormInput>
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                placeholder="Event date"
                required
              />
            </FormInput>
            <FormInput>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </FormInput>
            <FormInput>
              <label>Banner</label>
              <input
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                required
              />
            </FormInput>
          </CreateTask>
        </CreateVolunteerForm>

        <Button type="submit">{!submitting ? "submit" : "submiting..."}</Button>

        {status?.error && !status?.message ? (
          <p style={{ textAlign: "center", color: "red" }}>{status.error}</p>
        ) : (
          <p style={{ textAlign: "center", color: "green" }}>
            {status.message}
          </p>
        )}
      </CreateVolunteerFormContainer>
    </>
  );
};

export default CreateTaskform;

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

const Button = styled.button`
  justify-self: center;
  align-self: flex-end;
  padding: 5px 1rem;
  font-size: 1.2rem;
  background-color: #0084ff;
  color: #fff;
  border-radius: 4px;
  border: none;
  margin-right: 3vw;
  cursor: pointer;
`;
