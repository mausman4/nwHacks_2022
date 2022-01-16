import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

interface HomeProps {
    userID?: string
}

const Home: React.FC<HomeProps> = (props) => {
    const { userID } = props;
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!userID){
            navigate('../', {replace: true});
        }
        axios.get(`http://localhost:888/api/class`, {
            params: {
                user_id: userID
            }
        })
      .then(res => {

      })
    }, []);
    return (
        <div>
            {userID}
        </div>
    );
}

export default Home;
