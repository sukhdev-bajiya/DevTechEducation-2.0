import React from 'react'
import './Signin.css'
import logonight from '../../../assets/images/logonight.png'
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif"

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { userSignInFun } from '../../../Redux/action'
import { useNavigate } from "react-router-dom";


// Sign In Page Return Part

export default function SignIn() {
    document.title = "Dev Tech Education || SIGNIN"

    const { signinSuccessData, signinLoadingFlag, signinErrorFlag } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (signinSuccessData !== null && signinSuccessData.role === "admin") {
            navigate("/admin/dashboard")
        } else if (signinSuccessData !== null && signinSuccessData.role === "teacher") {
            navigate("/teacher/dashboard")
        } else if (signinSuccessData !== null && signinSuccessData.role === "student") {
            navigate("/student/dashboard")
        }
    }, [signinSuccessData]);

    const [inputBoxValue, setInputBoxValue] = React.useState({
        password: "",
        username: "",
    });

    // Password show and hide button part
    const [valuesPasswordViewPart, setvaluesPasswordViewPart] = React.useState(false);
    const handleClickShowPassword = () => {
        setvaluesPasswordViewPart(!valuesPasswordViewPart)
    };

    const signinformdata = () => {
        setInputBoxValue({ password: "", username: "" })
        dispatch(userSignInFun(inputBoxValue))
    }

    // Key press input part
    const handleOnChangeInputBoxValue = (e) => {
        const { name, value } = e.target;
        setInputBoxValue({ ...inputBoxValue, [name]: value });
    };

    const outerBoxForForm = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        margin: "50px auto",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "play",
        alignItems: "center",
        gap: "50px"
    };

    return (
        <Typography
            variant="div"
            noWrap
            component="div"
            style={outerBoxForForm}
            sx={{ width: { xs: "75%", sm: "50%" }, overflow: "hidden" }}
        >
            <Link to={"/"}><img src={logonight} alt="" className='welcome_signin_logo' /></Link>
            <Box className='welcome_signin_formOutsideBox'>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signin_username"> Username </InputLabel>
                    <Input
                        onChange={handleOnChangeInputBoxValue}
                        name="username"
                        value={inputBoxValue.username}
                        id="welcome_signin_username"
                        endAdornment={
                            <IconButton style={{ width: "40px" }}>
                                <AccountCircle />
                            </IconButton>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signin_password">Password</InputLabel>
                    <Input
                        name="password"
                        value={inputBoxValue.password}
                        id="welcome_signin_password"
                        type={valuesPasswordViewPart ? "text" : "password"}
                        onChange={handleOnChangeInputBoxValue}
                        endAdornment={
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                style={{ width: "40px" }}
                            >
                                {valuesPasswordViewPart ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        }
                    />
                </FormControl>
                <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                    <Button onClick={signinformdata}>{signinLoadingFlag ? <img src={freeLoadGif} alt="" style={{ width: "50px" }} /> : signinErrorFlag ? "Enter veiled data" : "Login"} </Button>
                </Stack>
            </Box>
            <Box><p> No account? <Link to="/signup" className='welcome_signin_createOne'>Create one</Link> </p></Box>
        </Typography>
    );
} 