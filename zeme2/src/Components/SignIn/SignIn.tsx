import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignIn.css';
import reactLogo from '../../logos/react_logo.png';
import azureLogo from '../../logos/azure_logo.png';
import mongoLogo from '../../logos/mongo_logo.png';
import nodeLogo from '../../logos/node_logo.png';
import expressLogo from '../../logos/express_logo.png';

interface SignInProps {
    setUserID: (userID: string) => void;
    setUserName: (userName: string) => void;
}

interface SignInData {
    username: string,
    password: string,
}

const SignIn: React.FC<SignInProps> = (props) => {
    const { setUserID, setUserName } = props;
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
            //basically await
            .then(res => {
                setUserID(res.data.userId);
                setUserName(values.username);
                navigate('/home', { replace: true});
            })
        }
    });

    return (
        <div>
            <div className='sign-in-page'>
                <div className="moving-clouds">
                    <div className="x1">
                        <div className="cloud"></div>
                    </div>

                    <div className="x2">
                        <div className="cloud"></div>
                    </div>

                    <div className="x3">
                        <div className="cloud"></div>
                    </div>

                    <div className="x4">
                        <div className="cloud"></div>
                    </div>

                    <div className="x5">
                        <div className="cloud"></div>
                    </div>
                </div>
                <div id='original-page'>
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
                            type="password"
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
                            <span>Sign In</span>
                        </Button>
                    </Box>
                </div>
                <div className="tech-stack">
                    <img src={azureLogo} alt="powered by Microsoft Azure" className="azure-logo"/>
                    <img src={reactLogo} alt="created with React"/>
                    <img src={mongoLogo} alt="database by MongoDB" className = "mongo-logo"/>
                    <img src={nodeLogo} alt="node.js" className = "node-logo"/>
                    <img src={expressLogo} alt="express.js" className = "express-logo"/>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
