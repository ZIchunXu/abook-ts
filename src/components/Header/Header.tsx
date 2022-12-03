import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Toolbar, AppBar, Typography, IconButton, Button, TextField, Stack } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./Header.scss";
const Header = ({ title = '' }) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static" className="block">
            <Toolbar>
                <IconButton
                    className="icon"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => navigate(-1)}
                    
                >
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Header;