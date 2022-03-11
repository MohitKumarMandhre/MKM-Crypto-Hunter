import { Snackbar } from '@material-ui/core';
import React from 'react';
import { CryptoState } from '../cryptoContext';
import MuiAlert from "@material-ui/lab/Alert";

const Alert = () => {

    const { alert, setAlert } = CryptoState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlert({ open: false });
    };

  return (
    <div>
        <Snackbar  open={alert.open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert 
            onClose={handleClose}
            variant="filled"
            elevation={10}
            severity={alert.type} >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    </div>
  )
}

export default Alert;