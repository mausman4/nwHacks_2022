import * as React from 'react';
import meme7 from "../../Assests/meme/7.jpeg";
import TextField from '@mui/material/TextField';
import { Button, Modal } from '@mui/material';
import './MemeFlow.css'
interface MemeFlowProps {
    isHost: boolean,
    closeModal: () => void;
}

const MemeFlow: React.FC<MemeFlowProps> = (props) => {
    const {isHost, closeModal} = props;
    const [tab, setTab] = React.useState<number>(0);
    const numPages = 3;

    React.useEffect(() => {
        if(numPages == tab) {
            closeModal();
        }
    }, [tab, numPages, closeModal]);


    const handleNextPage = () => {
        setTab(tab + 1);
    }

    //enter own
    if(tab === 0){
        return( 
        <div className="page-1">
            <div>
                <h3>Caption this meme!</h3>
            </div>
            <div>
                <img src={meme7}/>
            </div>
            <div>
            <TextField
                required
                label="caption"
            />
            </div>
            <div>
            <Button
                className='submit-button'    
                onClick={handleNextPage}
            >   
                <span>Submit</span>
            </Button>
            </div>
        </div>)
    //vote
    }else if(tab === 1){
        return <div>
            
        </div>
    }
    //leader?
    return <div>
        
    </div>
}

export default MemeFlow;
