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
})

const CreateThemeModal = ({
  classes, 
  open, 
  closeModal, 
  themeName, 
  handleThemeName,
  addTheme
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Theme Creation</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Enter the name fo your new theme
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="theme-name"
            label="Theme Name"
            type="text"
            value={themeName}
            onChange={handleThemeName}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeModal} color="secondary">Cancel</Button>
          <Button onClick={addTheme} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default withStyles(styles)(CreateThemeModal)