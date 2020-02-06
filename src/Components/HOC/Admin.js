import React from 'react';

const Admin = (Component, myAccessLevel) => {
    if (2 === myAccessLevel) {
        return <Component />
    } else {
        return null
    }
}
export default Admin
//**********************
//0-baned user        //
//1-simple user       //     
//2-administrator     //
//**********************