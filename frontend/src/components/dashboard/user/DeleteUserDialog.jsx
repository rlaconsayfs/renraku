import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const DeleteUserDialog = ({ username, open, handleClose, handleDelete }) => {
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (deleteDisabled && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [deleteDisabled, countdown]);

  useEffect(() => {
    setTimeout(() => {
      setDeleteDisabled(false);
    }, 5000);
  }, []);

  const handleDeleteClick = (e) => {
    handleDelete();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography color='error' gutterBottom>
              This will delete all of the contact's information.
            </Typography>
            <Typography>
              This action will log you out and cannot be undone.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color='error'
            onClick={(e) => handleDeleteClick(e)}
            autoFocus
            disabled={deleteDisabled}>
            {/* add a timer countdown */}
            {deleteDisabled
              ? countdown > 0
                ? `Delete in ${countdown}`
                : 'Delete'
              : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUserDialog;
