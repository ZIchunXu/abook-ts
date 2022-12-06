import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData } from "../../types/types";
import "./UserPassword.scss"

export const UserPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as UserData);
    const [password, setPassword] = useState('');
    const [new_password, setnewPassword] = useState('');
    const [confrimpassword, setConfirmPassword] = useState('');
    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const { data } = await axios.get('/api/user/getuser');
        setUser(data);
    }

    const uploadPassword = async () => {
        if (user.password !== password) {
            toast.error("Old Password Incorrect");
            return;
        }

        if (new_password !== confrimpassword) {
            toast.error("Please Confirm Password");
            return;
        }
        const params = {
            username: user.username,
            password: new_password,
        }
        const result = await axios.post('/api/user/editpassword', params);
        toast.success("Password Changed");
        navigate(-1);
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name === 'new_password') {
            setnewPassword(e.target.value);
        } else if (e.target.name === 'confrimpassword') {
            setConfirmPassword(e.target.value);
        }
    }

    return <div className="pass">
        <ToastContainer />
        <Header title='Reset Password' />
        <div className="form">
            <TextField id="password"
                name="password"
                value={password}
                label="Old Password"
                onChange={handleOnChange}
            />
            <TextField
                type="text"
                name="new_password"
                value={new_password}
                label="New Password"
                onChange={handleOnChange}
            />
            <TextField
                type="text"
                name="confrimpassword"
                value={confrimpassword}
                label="Confrim Password"
                onChange={handleOnChange}
            />
        </div>

        <div className="button">
            <Button variant="contained" onClick={() => uploadPassword()}>Save</Button>
        </div>

    </div>
}
export default UserPassword