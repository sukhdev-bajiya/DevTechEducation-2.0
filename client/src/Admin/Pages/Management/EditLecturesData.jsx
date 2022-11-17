import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditLecturesData() {
    const [openFromDialogEditLecturesData, setOpenFromDialogEditLecturesData] = React.useState(true);
    return (
        <Dialog open={openFromDialogEditLecturesData} >
            <DialogTitle>Edit Lectures Data</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenFromDialogEditLecturesData(false)}>Cancel</Button>
                <Button >Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditLecturesData