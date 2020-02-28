import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
//UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { downloadPicture } from '../../API/fileAPI'
//Component

const useStyles = makeStyles(theme => ({
    root: {}
}));

function Profile() {
    const classes = useStyles();
    const [img, setImg] = useState()
    useEffect(() => {
        downloadPicture(handler)
    }, [])
    const handler = data => {
      /*   data = Buffer.from(data).toString('base64') */
        console.log( data.file);
        setImg(data.file)
    }
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <h1>It Profile</h1>
                {img && <img src={`data:image/gif;base64,${img}`}
                    style={{ width: '10rem', height: '10rem' }}></img>}
            </Paper>
        </div>
    );
}

export default Profile