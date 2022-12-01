import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { gotoDashboard } from "../../../Redux/action";

function Home() {
  document.title = "Dev Tech Education || Home";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gotoDashboard());
  }, [dispatch]);

  return <div style={{ height: "10000px" }}>Home</div>;
}

export default Home;
