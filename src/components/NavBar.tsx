import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { Tabs, Tab, SvgIconProps, Typography, Box, Alert, Button, TextField, Stack } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useLocation, useNavigate } from "react-router-dom";

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
        // setValue(newValue);
        setActiveKey(newValue)
        navigate(newValue)
    };

    return (
            <Tabs id="navbar" value={activeKey} onChange={handleChange} aria-label="icon tabs example">
                <Tab icon={<HomeIcon />} label="home" value="/" />
                <Tab icon={<AssessmentIcon />} label="statistics" value="/statistics" />
                <Tab icon={<PersonIcon />} label="user" value="/user" />
            </Tabs>
    );
}