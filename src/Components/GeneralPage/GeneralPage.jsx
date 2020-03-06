import React, { useState, useEffect } from 'react';
import './style.scss'
//Component
//Until
import { textShower } from '../../until/FileWork'
import titleSite from '../../Content/text/titleSite.txt'
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