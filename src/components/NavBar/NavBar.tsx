import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { Tabs, Tab, Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";

interface NavBarProps {
  showNav: boolean
}

export const NavBar: React.FC<NavBarProps> = ({ showNav }) => {
  const location = useLocation();
  const { pathname } = location;
  const [activeKey, setActiveKey] = useState('pathname');
  const navigate = useNavigate();

  const el = document.getElementById('navbar');

  // Show nav or not
  if (el != null) {
    if (showNav) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveKey(newValue)
    navigate(newValue)
  };

  return (
    <BottomNavigation
      id="navbar"
      className="tab"
      showLabels
      value={activeKey}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} value="/" />
      <BottomNavigationAction label="Statistics" icon={<AssessmentIcon />} value="/statistics" />
      <BottomNavigationAction label="User" icon={<PersonIcon />} value="/user" />
    </BottomNavigation>

  );
}