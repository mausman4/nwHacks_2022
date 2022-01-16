import * as React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Meeting from '../Meeting/Meeting';
import SignIn from '../SignIn/SignIn';

interface MeetingWrapperProps {
};

const MeetingWrapper: React.FC<MeetingWrapperProps> = (props) => {
    const { state } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userId, setUserId] = React.useState<string>((state as any)?.userId);
    const [userName, setUserName] = React.useState<string>((state as any)?.userName);
    const [meetingId, setMeetingId] = React.useState<string | null>(userId ? (state as any)?.meetingId : searchParams.get('meetingId'));
    const [groupLocator, setGroupLocator] = React.useState<string | null>(searchParams.get('groupId'));

    if(!userId || !userName) {
        return <SignIn
            setUserID={setUserId}
            setUserName={setUserName}
        />
    }

    return <Meeting
        userID={userId}
        userName={userName}
        meetingID={meetingId}
        groupLocator={groupLocator}
        isHost={!groupLocator}
    />;

};

export default MeetingWrapper;
