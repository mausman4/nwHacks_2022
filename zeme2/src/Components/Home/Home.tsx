import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import './Home.css';

interface HomeProps {
    userID?: string
    userName?: string
}


const Home: React.FC<HomeProps> = (props) => {
    const { userID, userName } = props;
    const [ classList, setClassList ] = React.useState<string[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!userID){
            navigate('../', {replace: true});
        }
        axios.get(`http://localhost:888/api/getClass`, {
            params: {
                user_id: userID
            }
        })
        .then(res => {
            setClassList(res.data.classList.map((item: any) => item.class_id));
        });
    }, []);

    const handleAddClass = React.useCallback((class_id: string) => {
        axios.post(`http://localhost:888/api/makeClass`, {
            class_id: "Test Class",
            host_id: userID,
        })
        .then(res => {
            setClassList([class_id, ...classList]);
        });
    }, []);

    const renderContent = React.useCallback(() => {
        if(classList && classList.length > 0){

        }
        return (
            <div className='no-classes-container'>
                <div className='no-classes-wrapper'>
                    <div className='no-classes-description'>
                        Looks like you don't have any classes yet. To get started, create a new class!
                    </div>
                    <Button
                        size="large"
                        className='add-class-button'
                        onClick={() => handleAddClass('Test')}
                    >
                        + Create Class
                    </Button>
                </div>
            </div>
        );
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" className='tool-bar'>
                    <Typography variant="h6" color="inherit" component="div">
                        {`${userName}'s Dashboard`}
                    </Typography>
                    <Button
                        className='logout-button'
                        onClick={() => navigate('../', {replace: true})}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <div className='content'>
                { renderContent() }
            </div>
      </>
    );
}

export default Home;
