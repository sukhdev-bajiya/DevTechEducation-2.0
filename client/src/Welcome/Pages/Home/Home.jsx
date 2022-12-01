import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gotoDashboard } from "../../../Redux/action";

function Home() {
  document.title = "Dev Tech Education || Home";

  // handle user
  const { signinSuccessData } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // handle user already signed in
    if (signinSuccessData === null) dispatch(gotoDashboard());
  }, [dispatch, signinSuccessData]);

  return <div style={{ height: "1000px" }}>Home</div>;
}

export default Home;
