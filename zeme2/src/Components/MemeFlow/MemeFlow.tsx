import * as React from 'react';

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

    if(tab === 0){
        return <div>

        </div>
    }else if(tab === 1){
        return <div>

        </div>
    }
    return <div>
        
    </div>
}

export default MemeFlow;
