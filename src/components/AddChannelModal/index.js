import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

const styles = () => ({
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const CreateThemeModal = ({
  classes, 
  open, 
  closeModal, 
  channelName, 
  channelUrl,
  handleChannelName,
  handleChannelUrl,
  addChannel
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Channel</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Add a new Youtube channel to your theme by providing the url.
          </DialogContentText>
          <div className={classes.fieldsContainer}>
            <TextField
              margin="dense"
              id="channel-name"
              label="Channel Name"
              placeholder="the name"
              type="text"
              value={channelName}
              onChange={handleChannelName}
            />
            <TextField
              margin="dense"
              id="theme-name"
              label="Channel Url"
              placeholder="https://www.youtube.com/channel/3x3mpleUr1"
              type="text"
              value={channelUrl}
              onChange={handleChannelUrl}
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeModal} color="secondary">Cancel</Button>
          <Button onClick={addChannel} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default withStyles(styles)(CreateThemeModal)