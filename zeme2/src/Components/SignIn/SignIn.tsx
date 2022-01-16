import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignIn.css';

interface SignInProps {
    setUserID: (userID: string) => void;
}

interface SignInData {
    username: string,
    password: string,
}

const SignIn: React.FC<SignInProps> = (props) => {
    const { setUserID } = props;
    const navigate = useNavigate();
    const initialValues: SignInData = {
        username: '',
        password: ''
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            axios.post(`http://localhost:888/api/login`, {
                username: values.username,
                password: values.password
            })
            .then(res => {
                setUserID(res.data.userId);
                navigate('/home', { replace: true});
            })
        }
    });

    return (
        <div className='sign-in-page'>
            <Box className='sign-in-box'>
                <div className='title'>Zeme</div>
                <TextField
                    required
                    label="Username"
                    name='username'
                    id='username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='text-field'
                />
                <TextField
                    required
                    label="Password"
                    name='password'
                    id='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='text-field'
                />
                <Button
                    className='submit-button'
                    onClick={formik.submitForm}
                >
                    Sign In
                </Button>
            </Box>
        </div>
    )
}

export default SignIn;
