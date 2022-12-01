import React from "react";
import Cookies from "universal-cookie";

function Dashboard() {
  document.title = "Dev Tech Education || Admin || Dashboard";

  const cookies = new Cookies();

  console.log(cookies.get("devtechusercookie"));

  return <div>Dashboard</div>;
}

export default Dashboard;
