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
            console.log('res', res);
            setClassList(res.data.classList.map((item: any) => item.class_id));
        });
    }, []);

    const handleAddClass = (class_id: string) => {
        axios.post(`http://localhost:888/api/makeClass`, {
            class_id: class_id,
            host_id: userID,
        })
        .then(res => {
            console.log('setting classList', [class_id, ...classList]);
            setClassList([class_id, ...classList]);
        });
    };

    const handleStartMeeting = (class_id: string) => {
        axios.post('http://localhost:888/api/class/meeting', {
            class_id: class_id,
        }).then(res => {
            console.log('meetingId', res.data.meeting_id);
            navigate('../meeting', {
                replace: true,
                state: {
                    meetingId: res.data.meeting_id,
                    userName: userName,
                    userId: userID,
                }
            })
        })
    }

    const handleClick = () => {
        let class_id = prompt('Enter class ID associated with this meeting')
        if (class_id){
            handleAddClass(class_id)
        }
        else{
            handleAddClass('unspecified id')
        }
        
    }

    const renderContent = () => {
        if(classList && classList.length > 0){
            return (
                <>  <div id = "big">
                        <div className='classes-container'>
                        {classList.map((class_name: string, i: number) => {
                            return <div className='class-item' key={i}>
                                <div className='class-name'>
                                    {class_name}
                                </div>
                                <Button
                                    variant="contained"
                                    className='start-meeting'
                                    onClick={() => handleStartMeeting(class_name)}
                                >
                                    Start Meeting
                                </Button>
                            </div>
                        })}
                       
                        <div className="add-class-div">
                            <Button
                                className='add-class-button'
                                onClick={handleClick}
                            >
                                + Create New Class
                            </Button>
                        </div>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <div className='no-classes-container'>
                <div className='no-classes-wrapper'>
                    <div className='no-classes-description'>
                        Looks like you don't have any classes yet. To get started, create a new class!
                    </div>
                    <Button
                        className='add-class-button'
                        onClick={handleClick}
                    >
                        + Create New Class
                    </Button>
                </div>
            </div>
        );
    };

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
