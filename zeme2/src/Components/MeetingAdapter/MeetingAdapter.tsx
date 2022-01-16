import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import React, { useState, useEffect } from 'react';
import rubiks from '../../logos/rubiks.gif';
import { Button } from '@mui/material';
import './MeetingAdapter.css';
import * as fs from 'fs';


type CallAdapterExampleProps = {
  userId: CommunicationUserIdentifier;
  accessToken: string;
  callLocator: GroupCallLocator | TeamsMeetingLinkLocator;
  displayName: string;
};

const handleClick = () => {
  let files = fs.readdirSync('../../Assests/meme')
  let chosenFile = '../../Assests/meme' + files[Math.floor(Math.random() * files.length)]
  //SEND THROUGH SOCKET!!!
}

const MeetingAdapter: React.FC<CallAdapterExampleProps> = (props)=> {
  const [callAdapter, setCallAdapter] = useState<CallAdapter>();
  useEffect(() => {
    if (props) {
      const createAdapter = async (): Promise<void> => {
        setCallAdapter(
          await createAzureCommunicationCallAdapter({
            userId: props.userId,
            displayName: props.displayName,
            credential: new AzureCommunicationTokenCredential(props.accessToken),
            locator: props.callLocator
          })
        );
      };
      createAdapter();
    }
    return () => {
      if (callAdapter) {
        callAdapter.dispose();
      }
    };
  }, [props, callAdapter]);

  return (
    <div className = "container" style={{ height: '90vh', width: '100vw', border: '5px solid red'}}>
      {callAdapter ?<div className="call-adapt"> <CallComposite 
        adapter={callAdapter} 
      /><div className = "meeting-button">
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
        >
          + Meme
        </Button>
      </div>
      </div>
      : 
      <div className="load-animation">
        <img src={rubiks} alt='loading gif, rubiks cube'/>
        <p>Initializing meeting...</p>
      </div>}
    </div>
  );

  
};

export default MeetingAdapter;
