import React, { useState, useEffect } from 'react';
import { CommunicationIdentityClient } from '@azure/communication-identity'
import MeetingAdapter from '../MeetingAdapter/MeetingAdapter';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import './Meeting.css';

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
        socket.on('connect', () => {
            socket.emit('start-memes', '1234');
        });

        socket.on('start-memes', (meetingId, meme) => {
            console.log('start-memes', meetingId, meme);
        });
        
    }, []);

    const copyMeetingLink = () => {
        const link = `http://localhost:3000/meeting?meetingId=${meetingID}&groupId=${groupLocator}`;
        console.log('link', link);
        navigator.clipboard.writeText(link);
    }

    if(user && token && groupLocator) {
        return (
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
                </div>}
            </div>
        );
    }
    return null;
}

export default Meeting;
