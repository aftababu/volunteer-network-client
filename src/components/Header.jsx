import { Link } from "react-router-dom";
import { styled } from "styled-components";
import nav from "../nav";
import { selectUser } from "../redux/slice/manageUserTaskSlice";
import { useSelector } from "react-redux";
import { auth } from "../firebase.config";

const Header = () => {
  const user = useSelector(selectUser);
  const handleSignout = () => {
    auth.signOut();
  };
  return (
    <HeaderContainer>
      <ImgContainer>
        <img src="./logos/Group 1329.png" alt="web logo" />
      </ImgContainer>
      <NavMenuContainer>
        <List>
          {nav.map((item, key) => (
            <ListItem key={key}>
              <Link to={`${item.to}`}>{item.title}</Link>
            </ListItem>
          ))}
          {!user?.email ? (
            <ListItem>
              <Link to={`/register`}>Register</Link>
            </ListItem>
          ) : (
            <>
              <Username>
                <p>{user?.displayName}</p>
                <Signout onClick={handleSignout}>sign out</Signout>
              </Username>
            </>
          )}

          <ListItem>
            <Link to={`/admin/displaytask`}>Admin</Link>
          </ListItem>
        </List>
      </NavMenuContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  max-width: 100vw;
  margin: 10px 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media only screen and (max-width: 768px) {
    max-width: 99vw;
    margin: 0 auto;
  }
`;

const ImgContainer = styled.div`
  img {
    object-fit: contain;
    max-height: 55px;
    margin-bottom: 10px;
    position: relative;
    z-index: 3;
    opacity: 1;
  }
`;

const NavMenuContainer = styled.nav``;

const List = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1px;
  /* position: relative; */
`;

const ListItem = styled.li`
  a {
    text-decoration: none;
    color: #444;
    padding: 0 1vw;
    border-radius: 4px;
    font-size: 15px;
    transition: all 0.2s ease;
    position: relative;
    &::after {
      content: "";
      border-bottom: 3px solid #333;
      display: inline-block;
      position: absolute;
      height: 2px;
      bottom: -6px;
      left: 0;
      right: 0;
      opacity: 0;
      transform-origin: center center;
      transform: scaleX(0);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    &:hover {
      color: #111;
      &::after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
  &:nth-child(5) {
    a {
      color: #fff;
      padding: 10px 18px;
      background-color: #3f90fc;
      &::after {
        display: none;
      }
    }
  }
  &:nth-child(6) {
    a {
      color: #fff;
      padding: 10px 18px;
      background-color: #434141;
      margin-left: 1vw;
      &::after {
        display: none;
      }
    }
  }
`;
const Signout = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  position: absolute;
  bottom: -30px;
  right: -5px;
  transition: all 0.3s ease;
  background-color: rgba(109, 109, 109, 0.521);
  color: #fff;
  padding: 5px 10px;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
  cursor: pointer;
`;
const Username = styled.p`
  position: relative;
  &:hover {
    ${Signout} {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
`;
