import React from 'react';
import './style.scss'
//Components
import Welcome from './Blocks/Welcome'
import UserConstructorTask from './Blocks/UserConstructorTask'
import NewTest from './Blocks/NewTests'




function GeneralPage() {
    return (
        <div className='generalPage'>
            <div className="generalPage_conteiner">
                <Welcome />
                <UserConstructorTask />
                <NewTest />
            </div>
        </div>
    );
}

export default GeneralPage