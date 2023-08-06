import { styled } from "styled-components";
import { volunteerTask } from "../redux/slice/taskSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const colors = ["#FFBD3E", "#FF7044", "#3F90FC", "#421FCF"];
  return colors[Math.floor(Math.random() * colors.length)];
};
const generateColorsForLine = () => {
  const uniqueColors = new Set();
  while (uniqueColors.size < 4) {
    uniqueColors.add(getRandomColor());
  }
  return Array.from(uniqueColors);
};
const Volunteer = () => {
  const task = useSelector(volunteerTask);
  const navigate = useNavigate();
  const itemsPerLine = 4;
  const totalLines = Math.ceil(task.length / itemsPerLine);
  const colorsByLine = Array.from(
    { length: totalLines },
    generateColorsForLine
  );
  const handleNavigate = (id) => {
    navigate(`/task/${id}`);
  };
  return (
    <Container>
      <Hero>
        <TextContainer>
          <p>{"I Grow helping people in need".toUpperCase()}</p>
        </TextContainer>
        <SearchContainer>
          <input type="search" name="" id="" placeholder="search..." />
          <p>search</p>
        </SearchContainer>
      </Hero>
      <Main>
        {task.map((item, key) => {
          const lineIndex = Math.floor(key / itemsPerLine);
          const colorIndex = key % itemsPerLine;
          const color = colorsByLine[lineIndex][colorIndex];
          // console.log(color);
          return (
            <Task key={key} onClick={() => handleNavigate(item._id)}>
              <TaskImage src={item.banner} alt="" />
              <p style={{ backgroundColor: `${color}` }}>{item.eventTitle}</p>
            </Task>
          );
        })}
      </Main>
    </Container>
  );
};

export default Volunteer;

const Container = styled.section`
  max-width: 90vw;
  margin: 3rem auto;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem;
`;

const TextContainer = styled.div`
  flex: 1;
  p {
    font-size: 2rem;
    font-weight: bold;
    color: #111;
    word-spacing: 3px;
    margin: 1.8rem;
  }
`;

const SearchContainer = styled.div`
  /* display: flex;
  align-items: center; */
  display: flex;
  align-items: center;

  color: #3f90fc;

  input {
    /* padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px; */
    /* margin-right: 10px; */
    font-size: 20px;
    width: 30vw;
    padding: 8px 14px;
    border: none;
    box-shadow: 0 0 2px #646464be;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    outline: none;
  }
  p {
    font-size: 16px;
    color: #333;
    cursor: pointer;
    padding: 12px 26px;
    background-color: #3f90fc;
    color: white;
    border: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Task = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 16:9 aspect ratio (9 / 16 * 100) */
  border-radius: 8px;
  overflow: hidden;

  p {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6vw;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* background-color: rgba(0, 0, 0, 0.7); */
    color: white;
  }
`;

const TaskImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 6vw);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

// Task.defaultProps = {
//   src: "./images/babySit.png", // Default image if src is not provided
// };

// TaskImage.defaultProps = {
//   src: "./images/babySit.png", // Default image if src is not provided
// };

// const TaskText = styled.p`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
// `;
