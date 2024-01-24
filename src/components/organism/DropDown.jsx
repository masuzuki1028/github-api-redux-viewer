import React, { useState,useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/constants";

const SContainer = styled.div``;

const SMenuIcon = styled.i`
  cursor: pointer;
`;

const SDropDownMenu = styled.div`
  position: absolute;
  margin-top: 16px;
  right: 16px;
  width: 200px;
  border-radius: 2px;
  padding: 8px 0px;
  background: ${colors.white};
  color: black;
  box-shadow: 1px 1px 4px 1px #33333326;
`;

const SMenuItem = styled.li`
  padding: 0;

  a {
    display: block;
    color: ${colors.black};
    padding: 8px;
    font-size: 1rem;
  }

  a:hover {
    background: ${colors.hoverRow};
    color: ${colors.white};
  }
`;

export const DropDown = () => {
  const [showDropMenu, setShowDropMenu] = useState(false);
  const onDisplaySwitch = () => setShowDropMenu(!showDropMenu);
  const dropDownRef = useRef(null);

  useEffect (() => {
  const handleClick = (e) => {
    console.log(e.target);
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setShowDropMenu(false);
    }
    };
    if (showDropMenu) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showDropMenu]);
  


  return (
    <SContainer>
      <SMenuIcon className="fa fa-bars" onClick={onDisplaySwitch} />
      {showDropMenu && (
        <SDropDownMenu ref={dropDownRef}>
          <ul>
            <SMenuItem>
              <Link to="/" onClick={onDisplaySwitch}>
                Top
              </Link>
              <Link to="/profile" onClick={onDisplaySwitch}>
                Your Profile
              </Link>
              <Link to="/issue" onClick={onDisplaySwitch}>
                Issue
              </Link>
              <Link to="/pull-request" onClick={onDisplaySwitch}>
                Pull Request
              </Link>
            </SMenuItem>
          </ul>
        </SDropDownMenu>
      )}
    </SContainer>
  );
};
