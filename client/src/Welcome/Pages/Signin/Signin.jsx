import React from 'react'
import './Signin.css'
import logonight from '../../../assets/images/logonight.png'
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif"
import ResetPassword from "./ResetPassword"
import ResetUsername from "./ResetUsername"

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
import { Tooltip } from '@mui/material';


// Sign In Page Return Part

export default function SignIn() {
    document.title = "Dev Tech Education || SIGNIN"

    const { signinSuccessData, signinLoadingFlag, signinErrorFlag } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (signinSuccessData !== null && signinSuccessData !== undefined) {
            if (signinSuccessData.user.role === "admin") {
                navigate("/admin/dashboard")
            } else if (signinSuccessData.user.role === "teacher") {
                navigate("/teacher/dashboard")
            } else if (signinSuccessData.user.role === "student") {
                navigate("/student/dashboard")
            }
        }
    }, [signinSuccessData]);

    const [inputBoxValue, setInputBoxValue] = React.useState({
        password: "",
        username: "",
    });
    const [buttonDisable, setButtonDisable] = React.useState(true);

    // Password show and hide button part
    const [valuesPasswordViewPart, setvaluesPasswordViewPart] = React.useState(false);
    const handleClickShowPassword = () => {
        setvaluesPasswordViewPart(!valuesPasswordViewPart)
    };

    const signinformdata = (event) => {
        event.preventDefault();
        dispatch(userSignInFun(inputBoxValue))
        setInputBoxValue({ password: "", username: "" })
    }

    // Key press input part
    const handleOnChangeInputBoxValue = (e) => {
        const { name, value } = e.target;
        setInputBoxValue({ ...inputBoxValue, [name]: value });

        if (inputBoxValue.password >= 7 && inputBoxValue.username >= 12) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
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

    const [openFormDialogFunIndex, setOpenFormDialogFunIndex] = React.useState(-1);
    const openFormDialogFun = (index) => {
        if (openFormDialogFunIndex === index) {
            setOpenFormDialogFunIndex(-1);
        } else {
            setOpenFormDialogFunIndex(index);
        }

    };
    const managementPropItem = [<ResetPassword />, <ResetUsername />]



    return (
        <Typography
            variant="div"
            noWrap
            component="div"
            style={outerBoxForForm}
            sx={{ width: { xs: "90%", sm: "50%" }, overflow: "hidden" }}
        >
            <Link to={"/"}><img src={logonight} alt="" className='welcome_signin_logo' /></Link>
            <form className='welcome_signin_formOutsideBox' onSubmit={signinformdata}>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signin_username"> Username </InputLabel>
                    <Input
                        required
                        type='number'
                        onChange={handleOnChangeInputBoxValue}
                        name="username"
                        value={inputBoxValue.username}
                        id="welcome_signin_username"
                        endAdornment={
                            <Tooltip title="Enter your 13 digit username">
                                <IconButton style={{ width: "40px" }}>
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signin_password">Password</InputLabel>
                    <Input
                        required
                        name="password"
                        value={inputBoxValue.password}
                        id="welcome_signin_password"
                        type={valuesPasswordViewPart ? "text" : "password"}
                        onChange={handleOnChangeInputBoxValue}
                        endAdornment={
                            <Tooltip title="Enter your password">
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
                            </Tooltip>
                        }
                    />
                </FormControl>
                <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                    <Button type='submit' disabled={buttonDisable}>{signinLoadingFlag ? <img src={freeLoadGif} alt="" style={{ width: "50px" }} /> : signinErrorFlag ? "Enter veiled data" : "Login"} </Button>
                </Stack>
            </form>

            <Box><p> No account? <Link to="/signup" className='welcome_signin_createOne'>Create New Account</Link> </p></Box>

            <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                <Button onClick={() => openFormDialogFun(0)}>Reset Password</Button>
                <Button onClick={() => openFormDialogFun(1)}>Reset Username</Button>
            </Stack>

            {openFormDialogFunIndex !== -1 ? managementPropItem[openFormDialogFunIndex] : ""}
        </Typography>
    );
} 