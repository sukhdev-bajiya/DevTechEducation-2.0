import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddCourses() {
  const [openFromDialogAddCourses, setOpenFromDialogAddCourses] =
    React.useState(true);
  return (
    <Dialog open={openFromDialogAddCourses}>
      <DialogTitle>Add Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add courses for students - In courses stor subject and lectures
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenFromDialogAddCourses(false)}>
          Cancel
        </Button>
        <Button>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCourses;
