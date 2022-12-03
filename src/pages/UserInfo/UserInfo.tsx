import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { Tabs, Tab, Avatar, Box, Alert, Button, TextField, Stack } from "@mui/material";
import { Input, FilePicker } from 'zarm';
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/Header/Header";
import { toast } from 'react-toastify';
import { imgUrlTrans } from "../../utils/utils";
import { UserData } from "../../types/types";
import "./UserInfo.scss"

export const UserInfo = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as UserData);
    const [about, setAbout] = useState<string>('');
    const [avatar, setAvatar] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        getUserInfo();
    }, []);
    const getUserInfo = async () => {
        const { data } = await axios.get('/api/user/getuser');
        setUser(data);
        setAvatar(imgUrlTrans(data.avatar))
        setAbout(data.about);
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAbout(e.target.value);
    }

    const handleSelect = (file: any) => {
        console.log('file, file', file.file);
        if (file && file.file.size > 400 * 1024) {
            toast.error("Your file is too powerful! Max file size is 400KB")
            return;
        }
        let formData = new FormData();
        formData.append('file', file.file);
        const url = "/api/upload"
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': token as string
            }
        }).then((res) => {
            setAvatar(imgUrlTrans(res.data))
            toast.success("Upload Successfull")
        })

    }
    const uploadInformation = async () => {
        const params = {
            about: about,
            avatar: avatar
        }
        const result1 = await axios.post('/api/user/updateinfo', params);
        navigate(-1);
    }
    return (
        <div className="user">
            <Header title='User information' />
            <div className="form">
                <div className="left">
                    <Avatar className="avatar" src={user.avatar} />
                    <FilePicker className="filePicker" onChange={handleSelect} accept="image/*">
                        <div className="upload" />
                    </FilePicker>
                </div>
                
                <div className="right">
                    <div className="name">User: {user.username || '--'}</div>
                    <div className="about">
                        <TextField
                            name="about"
                            label="About"
                            value={about}
                            size="small"
                            placeholder="Please enter your information"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
            <Button className="button" variant="contained" onClick={() => uploadInformation()}>Save</Button>
        </div>
    )
}