import React, { useState, useEffect } from 'react';
import { CommunicationIdentityClient } from '@azure/communication-identity'
import MeetingAdapter from '../MeetingAdapter/MeetingAdapter';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import socketIOClient, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal } from '@mui/material';
import './Meeting.css';
import MemeFlow from '../MemeFlow/MemeFlow';

const ENDPOINT = "http://localhost:888";


interface MeetingProps {
    userID: string
    userName: string
    meetingID?: string | null
    groupLocator?: string | null
    isHost: boolean
}

const Meeting: React.FC<MeetingProps> = (props) => {
    const {userID, userName, meetingID, isHost} = props;
    const [user, setUser] = React.useState<CommunicationUserIdentifier>();
    const [token, setToken] = React.useState<string>();
    const [groupLocator, setGroupLocator] = React.useState<string | null | undefined>(props.groupLocator);
    const [socket, setSocket] = React.useState<Socket<any>>();
    const [currentlyMemeing, setCurrentlyMemeing] = React.useState<boolean>(false);

    React.useEffect(() => {
        const connectionString = process.env.REACT_APP_COMMUNICATION_SERVICES_CONNECTION_STRING || '';

        // Instantiate the identity client
        const identityClient = new CommunicationIdentityClient(connectionString);
        // Issue an identity and an access token with the "voip" scope for the new identity
        identityClient.createUserAndToken(["voip"]).then((identityTokenResponse) => {
            setUser(identityTokenResponse.user);
            setToken(identityTokenResponse.token);
        });

        if(!groupLocator && isHost) {
            setGroupLocator(uuidv4());
        }

        const socket = socketIOClient(ENDPOINT);
        setSocket(socket);
        socket.on('connect', () => {
            
        });

        socket.on('start-memes', () => {
            setCurrentlyMemeing(true);
            console.log('starting memes');
        });
        
    }, []);

    const copyMeetingLink = () => {
        const link = `http://localhost:3000/meeting?meetingId=${meetingID}&groupId=${groupLocator}`;
        console.log('link', link);
        navigator.clipboard.writeText(link);
    }

    const startMemes = () => {
        socket?.emit('start-memes');
        setCurrentlyMemeing(true);
    }

        /*
    const handleClick = () => {
    /*
    let files = fs.readdirSync('../../Assests/meme')
    let chosenFile = '../../Assests/meme' + files[Math.floor(Math.random() * files.length)]
    //SEND THROUGH SOCKET!!!
    }*/

    if(user && token && groupLocator) {
        return (
            <>
                <div className={`video-call ${isHost ? 'host' : ''}`}>
                    <MeetingAdapter
                        userId={user}
                        accessToken={token}
                        callLocator={{
                            groupId: groupLocator 
                        }}
                        displayName={userName}
                    />
                    {isHost && <div className='bottom-buttons'>
                        <Button
                            endIcon={<ContentCopyIcon/>}
                            onClick={copyMeetingLink}
                        >
                            Copy Meeting Invitation
                        </Button>
                        <Button
                            onClick={startMemes}
                        >
                            Start Memes
                        </Button>

                    </div>}
                </div>
                <Modal
                    open={currentlyMemeing}
                >
                    <MemeFlow
                        isHost={isHost}
                        closeModal={() => setCurrentlyMemeing(false)}
                    />
                </Modal>
            </>
        );
    }
    return null;
}

export default Meeting;
