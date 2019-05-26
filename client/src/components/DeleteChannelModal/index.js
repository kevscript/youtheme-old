import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

const styles = () => ({
})

const DeleteChannelModal = ({
  classes, 
  open, 
  closeModal,
  deleteChannel
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Theme Deletion</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Are you sure you want to delete this channel?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeModal} color="primary">Go Back</Button>
          <Button onClick={deleteChannel} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default withStyles(styles)(DeleteChannelModal)