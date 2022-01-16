import * as React from 'react';
import meme1 from "../../Assests/meme/1.jpeg";
import meme2 from "../../Assests/meme/2.jpeg";
import meme3 from "../../Assests/meme/3.jpeg";
import meme4 from "../../Assests/meme/4.jpeg";
import meme5 from "../../Assests/meme/5.jpeg";
import meme6 from "../../Assests/meme/6.jpeg";
import meme7 from "../../Assests/meme/7.jpeg";
import meme8 from "../../Assests/meme/8.jpeg";
import meme9 from "../../Assests/meme/9.jpeg";
import meme10 from "../../Assests/meme/10.jpeg";
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
        return (<div className="big_papa">
        <div className="page-3">
            <div className="item">
                <img src={meme1} id="leader1"/>
            </div>
            <div className="item">
                <img src={meme2} id="leader2"/>
            </div>
            <div className="item">
                <img src = {meme10} id="leader3"/>
            </div>
        </div>
        <div className="xx">
            <div id="vote">Caption 1</div>
            <div id="vote">Caption 2</div>
            <div id="vote">Caption 3</div>
            </div>
        <div className = "x">
        <Button
                className='submit-button'    
                onClick={handleNextPage}
            >   
                <span id="vote">See voting results</span>
            </Button>
        </div>
        </div>)
    }
    //leader?
    return (<div className="big_papa" onClick={handleNextPage}>
    <div className="page-3">
        <div className="item">
            <img src={meme9} id="leader1"/>
        </div>
        <div className="item">
            <img src={meme3} id="leader2"/>
        </div>
        <div className="item">
            <img src = {meme5} id="leader3"/>
        </div>
    </div>
    <div className = "bottom">
        <div className="item">
            <h3>1st: </h3><br/>
            <h3>9 points</h3>
        </div>
        <div className="item">
            <h3>2nd: </h3><br/>
            <h3>5 points</h3>
        </div>
        <div className="item">
            <h3>3rd: </h3><br/>
            <h3>4 points</h3>
        </div>
    </div>
    </div>
    
    )
}

export default MemeFlow;
