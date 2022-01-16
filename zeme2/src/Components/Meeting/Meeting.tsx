import React, { useState, useEffect } from 'react';
import { CommunicationIdentityClient } from '@azure/communication-identity'
import MeetingAdapter from '../MeetingAdapter/MeetingAdapter';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:888";

interface MeetingProps {
    
}

const Meeting: React.FC<MeetingProps> = (props) => {
    const [user, setUser] = React.useState<CommunicationUserIdentifier>();
    const [token, setToken] = React.useState<string>();

    React.useEffect(() => {
        const connectionString = process.env.REACT_APP_COMMUNICATION_SERVICES_CONNECTION_STRING || '';

        // Instantiate the identity client
        const identityClient = new CommunicationIdentityClient(connectionString);
        // Issue an identity and an access token with the "voip" scope for the new identity
        identityClient.createUserAndToken(["voip"]).then((identityTokenResponse) => {
            setUser(identityTokenResponse.user);
            setToken(identityTokenResponse.token);
        });
        const socket = socketIOClient(ENDPOINT);
        socket.on('connect', () => {
            socket.emit('start-memes', '1234');
        });

        socket.on('start-memes', (meetingId, meme) => {
            console.log('start-memes', meetingId, meme);
        });
        
    }, []);
    if(user && token) {
        return (
            <MeetingAdapter
                userId={user}
                accessToken={token}
                callLocator={{
                    groupId:"ad575c7e-1193-4dcf-8e77-1a3e46d23d75"
                }}
                displayName='Shea'
            />
        );
    }
    return null;
}

export default Meeting;
