import React, { useState, useEffect} from "react";
import axios from "../../utils/axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./User.scss";
import { UserData } from "../../types/types";
export const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData>({} as UserData);

    useEffect(() => {
        getUserInfo();
    }, []);

    const userInfo = () => {
        navigate(`/user/edit`)
    };

    const resetPasswordPage = () => {
        navigate(`/user/password`)
    };

    const getUserInfo = async () => {
        const { data } = await axios.get('/api/user/getuser');
        setUser(data);
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
    <div className="user">
        <Button className="logout" variant="contained" onClick={() => logout()}>Logout</Button>
        <div className="head">
          <img className="avatar"style={{ width: 100, height: 100, borderRadius: 8 }} src={user.avatar || '--'} alt="" />
          <span style={{ fontSize: 20}}><b>Name:{user.username || '--'}</b></span>
          <span style={{  fontSize: 17}}>About: {user.about || '--'}</span>
        </div>
        <div className="content">
            <div className="list" onClick={() => userInfo()}>Change Information</div>
            <div className="list" onClick={() => resetPasswordPage()} >Reset Password</div>
        </div>
      </div>)
}