import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddCourses() {
    const [openFromDialogAddCourses, setOpenFromDialogAddCourses] = React.useState(true);
    return (
        <Dialog open={openFromDialogAddCourses}>
            <DialogTitle>Add Courses</DialogTitle>
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
                <Button onClick={() => setOpenFromDialogAddCourses(false)} >Cancel</Button>
                <Button >Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCourses