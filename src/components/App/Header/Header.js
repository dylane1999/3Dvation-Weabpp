import Avatar from "components/Avatar";
import { MenuIcon } from "components/icons";
import Search from "components/Search";
import { A } from "components/Text";
import { HEADER_HEIGHT } from "constants/Layout";
import { useClickOutside } from "hooks/useClickOutside";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import defaultPic from "../../../img/default-pic.png";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import * as Routes from "routes";
import { generatePath } from "react-router-dom";
import People from "../../../pages/People";

const NavWrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row no-wrap;
  align-items: center;
  justify-content: flex-end;
  height: ${HEADER_HEIGHT}px;
  background-color: #198fd2;
  width: 100vw;
`;

const SearchWrapper = styled.div`
  width: 200px;
`;

const Hamburger = styled.div`
  cursor: pointer;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: none;
  }
`;

const Button = styled.div`
  height: 100%;
  width: 100%;
  padding-right: 15px;
`;

const Logo = styled(A)`
  display: none;
  color: ${(p) => p.theme.colors.primary.main};
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-size: ${(p) => p.theme.font.size.sm};

  &:hover {
    color: ${(p) => p.theme.colors.primary.main};
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: block;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftSection = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 70%;
  background-color: #198fd2;
  padding-right: 15px;

  @media(max-width: 1007px){
    width: 60%;
  }

  @media(max-width: 682px){
    width: 70%;
  }
`;

const RightSection = styled.div`
  display: flex;
  height: 100%;
  width: 30%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: #373737;
  padding-right: 15px;

  @media(max-width: 1007px){
    width: 40%;
  }

  @media(max-width: 682px){
    width: 30%;
  }
`;

const UserName = styled.div`
  font-family: proxima-nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  padding-right: 15px;
  color: #ffffff;

  @media (max-width: 700px) {
    display: none;
  }
`;

/**
 * Header of the App when user is authenticated
 */
const Header = ({ location, toggleSideBar }) => {
  const user = firebase.auth().currentUser;

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);

  const notificationRef = useRef(null);
  const userRef = useRef(null);

  const closeOnClickOutside = () => {
    if (dropdownOpen) {
      closeDropDown();
    }
  };

  useClickOutside(notificationRef, closeOnClickOutside);
  useClickOutside(userRef, closeOnClickOutside);

  const closeDropDown = () => {
    setDropdownOpen(null);
    setDropdownData([]);
  };
  //   to={generatePath(Routes.USER_PROFILE, { username: auth.user.username })}
  //    activeClassName="selected"
  return (
    <>
      <NavWrapper>
        <LeftSection>
          {/*code to disaply site name  <Logo to={Routes.HOME}>{SiteInfo.name}</Logo>*/}
          <SearchWrapper>
            <Search location={location} placeholder="Search" />
          </SearchWrapper>
        </LeftSection>
        <RightSection>
          <UserContainer>
            <UserName>
              <p>{user.email}</p>
            </UserName>
            <Link
              exact
              to={generatePath(Routes.USER_PROFILE, { username: user.uid })}
            >
              <Button>
                <Avatar image={defaultPic} size={40} />
              </Button>
            </Link>
          </UserContainer>
          <Hamburger onClick={toggleSideBar}>
            <MenuIcon />
          </Hamburger>
        </RightSection>
      </NavWrapper>
    </>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
};

export default withRouter(Header);
