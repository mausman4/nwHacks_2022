import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Components/SignIn/SignIn';
import Home from './Components/Home/Home';
import './App.css';
import Meeting from './Components/Meeting/Meeting';
import MeetingWrapper from './Components/MeetingWrapper/MeetingWrapper';

const App : React.FC = () => {
  const [userID, setUserID] = React.useState<string>();
  const [userName, setUserName] = React.useState<string>();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={
            <SignIn
              setUserID={setUserID}
              setUserName={setUserName}
              redirect={true}
            />
          }/>
          <Route path='/home' element={
            <Home
              userID={userID}
              userName={userName}
            />
          }/>
          <Route path='/meeting' element={
            <MeetingWrapper/> //this gets rendered
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
