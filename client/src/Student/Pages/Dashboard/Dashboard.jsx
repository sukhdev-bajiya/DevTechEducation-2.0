import React from "react";
import Typography from "@mui/material/Typography";

function Dashboard() {
  document.title = "Dev Tech Education || Student || Dashboard";

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={{ display: "grid", gap: "15px", padding: "15px" }}
      sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
    >
      Hello
    </Typography>
  );
}

export default Dashboard;

// const boxStyleLeft = {
//   width: "100%",
//   borderRight: "0px",
//   borderStyle: "double",
//   padding: "15px 0",
//   borderRadius: "10px",
//   minHeight: "250px",
// };

// const boxStyleRight = {
//   width: "100%",
//   borderLeft: "0px",
//   borderStyle: "double",
//   padding: "15px 0",
//   borderRadius: "10px",
//   minHeight: "250px",
// };
