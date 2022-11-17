import React from 'react'
import './Signup.css'
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
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { userSignUpFun } from '../../../Redux/action'


// Sign Up Page Return Part

export default function SignUp() {
    document.title = "Dev Tech Education || Student || SIGN UP"

    const { signupLoadingFlag, signupErrorFlag } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [inputBoxValue, setInputBoxValue] = React.useState({
        name: "",
        password: "",
        email: "",
        number: "",
        dateofbirth: ""
    });

    // Password show and hide button part
    const [valuesPasswordViewPart, setvaluesPasswordViewPart] = React.useState(false);
    const handleClickShowPassword = () => {
        setvaluesPasswordViewPart(!valuesPasswordViewPart)
    };

    const signupformdata = () => {
        setInputBoxValue({
            name: "",
            password: "",
            email: "",
            number: "",
            dateofbirth: ""
        })
        dispatch(userSignUpFun(inputBoxValue))
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
            sx={{ width: { xs: "90%", sm: "50%" }, overflow: "hidden" }}
        >
            <Link to={"/"}><img src={logonight} alt="" className='welcome_signup_logo' /></Link>
            <Box className='welcome_signup_formOutsideBox'>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_name"> Name </InputLabel>
                    <Input
                        onChange={handleOnChangeInputBoxValue}
                        name="name"
                        value={inputBoxValue.name}
                        id="welcome_signin_name"
                        endAdornment={
                            <IconButton style={{ width: "40px" }}>
                                <AccountCircle />
                            </IconButton>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_email"> Email </InputLabel>
                    <Input
                        type='email'
                        onChange={handleOnChangeInputBoxValue}
                        name="email"
                        value={inputBoxValue.email}
                        id="welcome_signin_email"
                        endAdornment={
                            <IconButton style={{ width: "40px" }}>
                                <MailIcon />
                            </IconButton>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_number"> Number </InputLabel>
                    <Input
                        type='number'
                        onChange={handleOnChangeInputBoxValue}
                        name="number"
                        value={inputBoxValue.number}
                        id="welcome_signin_number"

                        endAdornment={
                            <IconButton style={{ width: "40px" }}>
                                <PhoneIcon />
                            </IconButton>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_dateofbirth"> Date Of Birth </InputLabel>
                    <Input
                        type='date'
                        onChange={handleOnChangeInputBoxValue}
                        name="dateofbirth"
                        value={inputBoxValue.dateofbirth}
                        id="welcome_signin_dateofbirth"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <InputLabel htmlFor="welcome_signup_password">Password</InputLabel>
                    <Input
                        name="password"
                        value={inputBoxValue.password}
                        id="welcome_signup_password"
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
                    <Button onClick={signupformdata}>{signupLoadingFlag ? <img src={freeLoadGif} alt="" style={{ width: "50px" }} /> : signupErrorFlag ? "Enter veiled data" : "Sign Up"} </Button>
                </Stack>
            </Box>
            <Box><p>You Have Already An Account ? <Link to="/signin" className='welcome_signin_createOne'>Sign In</Link> </p></Box>
        </Typography>
    );
} 