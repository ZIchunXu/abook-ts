import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { Tabs, Tab, Typography, Box, Alert, Button, TextField, Stack } from "@mui/material";
import { toast } from 'react-toastify';
import axios from "../utils/axios";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Login = () => {
    const [value, setValue] = useState(0);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
            console.log(e.target.name)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const onSubmit = async (username: string, password: string, value: number) => {
        if (!username) {
            toast.error("Please enter username!")
            console.log(username)
            return;
        }
        if (!password) {
            toast.error("Please enter password!")
            console.log("pppp")
            return;
        }
        console.log("www")
        try {
            if (value == 0) {
                console.log("www")
                const { data } = await axios.post('/api/user/login', {
                    username,
                    password
                });
                localStorage.setItem('token', data.token);
                window.location.href = '/';
                toast.success('Login Sucessful');
            } else {
                const { data } = await axios.post('/api/user/register', {
                    username,
                    password
                });
                toast.success('Register Sucessful');
            }
        } catch (error) {
            toast.success('Incorrect username or password');
        }
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TextField id="username" name="username" value={username} label="Username" variant="outlined" onChange={handleOnChange} />
            <TextField id="password" name="password" value={password} label="Password" variant="outlined" onChange={handleOnChange} />

            <Button variant="contained" onClick={() => onSubmit(username, password, value)}>{value == 0 ? 'Login' : 'Register'}</Button>
        </Box>
    )
}