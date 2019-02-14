import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = () => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})

const ModalForm = ({
  classes, 
  open, 
  closeModal, 
  inputName, 
  handleInputName,
  addTheme
}) => {
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Theme Manager</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            id="theme-name"
            label="Theme Name"
            type="text"
            value={inputName}
            onChange={handleInputName}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button className={''}>Add Channel</Button>
          <div>
            <Button onClick={closeModal} color="secondary">Cancel</Button>
            <Button onClick={addTheme} color="primary">Add</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default withStyles(styles)(ModalForm)