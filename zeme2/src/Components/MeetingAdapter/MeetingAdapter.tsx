import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import React, { useState, useEffect } from 'react';

type CallAdapterExampleProps = {
  userId: CommunicationUserIdentifier;
  accessToken: string;
  callLocator: GroupCallLocator | TeamsMeetingLinkLocator;
  displayName: string;
};

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
    <div style={{ height: '100vh', width: '100vw' }}>
      {callAdapter ? <CallComposite 
        adapter={callAdapter} 
      /> : <>Initializing</>}
    </div>
  );
};

export default MeetingAdapter;
