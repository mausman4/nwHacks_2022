import * as React from 'react';
import { ZoomMtg } from "@zoomus/websdk";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const Zoom = () => {
    const ZOOM_ID = "zoom-embedded-app";
    React.useEffect(() => {
        // Select the root element you want to embed the client inside
        const rootElement = document.getElementById(ZOOM_ID);
    
        // Create the client
        const client = ZoomMtgEmbedded.createClient();
    
        // Set your init parameters
        const initParams = {
          debug: true,
          zoomAppRoot: rootElement,
          // ...
        };
    
        const MEETING_NUM= "76430121649";
        const MEETING_PASSWORD = "XySt0y";
    
        // Set your join params
        const joinParams = {
          apiKey: process.env.REACT_APP_API_KEY,
          signature: ZoomMtg.generateSignature({
            apiKey: process.env.REACT_APP_API_KEY,
            apiSecret: process.env.REACT_APP_API_SECRET,
            meetingNumber: MEETING_NUM,
            role: '0'
          }),
          meetingNumber: MEETING_NUM,
          password: MEETING_PASSWORD,
          userName: 'Shea'
        };
    
        // Init client
        client.init(initParams);
    
        // Join the meeting
        client
          .join(joinParams)
          .then((e) => {
            // Execute post join-meeting logic accordingly
          })
          .catch((e) => {
            // Handle join-meeting errors accordingly
          });
      }, []);
    
      return (
        <div id={ZOOM_ID} className='zoom-screen'>
    
        </div>
      );
}

export default Zoom;
