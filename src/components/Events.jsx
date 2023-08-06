import { styled } from "styled-components";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { memberShip, selectUser } from "../redux/slice/manageUserTaskSlice";

const Events = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const task = useSelector(memberShip);
  const [status, setStatus] = useState({ message: "", error: "" });
  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get("/membership/get", {
          params: {
            email: user?.email,
          },
        });
        setProducts(res?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getTask();
  }, [user?.email, status?.message]);

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        `/membership/delete/${products._id}/${itemId}`
      );
      showStatus(response?.data?.message, "");
    } catch (error) {
      showStatus("", "Error deleting item");
    }
    console.log(products._id, itemId);
  };

  const showStatus = (message, error) => {
    setStatus({ message, error });

    // Clear status messages after 2 seconds
    setTimeout(() => {
      setStatus({ message: null, error: null });
    }, 1000);
  };
  return (
    <Container>
      <Header />
      <EventContainer>
        {products.item?.map((items, key) => (
          <>
            <Task key={key}>
              <TaskImage src={items.banner} alt="" />
              <TextContainer>
                <p>{items.eventTitle}</p>
                <p>{new Date(items.joiningDate).toLocaleDateString()}</p>
                <button onClick={() => handleDelete(items._id)}>Cencel</button>
              </TextContainer>
            </Task>
          </>
        ))}
      </EventContainer>
      <p style={{ color: "green" }}>{status.message}</p>
      <p style={{ color: "red" }}>{status.error}</p>
    </Container>
  );
};

export default Events;

const Container = styled.div`
  background-color: #f8fafc;
  min-height: 100vh;
`;

const EventContainer = styled.div`
  margin-top: 4vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  background-color: #f8fafc;
  padding: 0 30px 0;
`;

const Task = styled.div`
  background-color: #fff;
  max-width: 100%;
  max-height: 92%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  border-radius: 20px;
  position: relative;
`;

const TaskImage = styled.img`
  width: 35%;
  height: 100%;
  /* object-fit: contain; */
`;
const TextContainer = styled.div`
  text-align: left;
  align-self: flex-start;
  justify-items: start;
  display: flex;
  flex-direction: column;
  align-items: start;

  p {
    padding: 1px;
    margin: 0.5vw 0;
  }
  button {
    /* align-self: flex-end; */
    padding: 6px 16px;
    border: none;
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
  }
  /* align-items: start; */
  /* justify-content: flex-start; */
`;
