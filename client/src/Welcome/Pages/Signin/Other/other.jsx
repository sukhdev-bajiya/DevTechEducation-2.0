import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Stack from "@mui/material/Stack";
import { NativeSelect } from '@mui/material';
import HorizontalNonLinearStepper from '../new';



function ResetPassword() {
    const [openFromDialogResetPassword, setOpenFromDialogResetPassword] = React.useState(true);

    const [inputBoxValue, setInputBoxValue] = React.useState({
        username: "",
        email: "",
        number: "",
        securityAnswer1: "",
        securityAnswer2: "",
        securityQuestion1: "What is your favorite movie?",
        securityQuestion2: "Who is your favorite actor, musician, or artist?"
    });


    const signupformdata = (event) => {
        event.preventDefault();
        setInputBoxValue({
            username: "",
            email: "",
            number: "",
            securityAnswer1: "",
            securityAnswer2: "",
            securityQuestion1: "What is your favorite movie?",
            securityQuestion2: "Who is your favorite actor, musician, or artist?"
        })
    }

    // Key press input part
    const handleOnChangeInputBoxValue = (e) => {
        const { name, value } = e.target;
        setInputBoxValue({ ...inputBoxValue, [name]: value });
    };

    return (
        <Dialog open={openFromDialogResetPassword} >
            <DialogTitle style={{ textAlign: "center", fontSize: "28px", fontWeight: "600" }}> Reset Password </DialogTitle>
            <DialogContent style={{ display: "flex", justifyContent: "center" }}>
                {/* <form className='welcome_signup_formOutsideBox' onSubmit={signupformdata}>
                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel htmlFor="welcome_signup_username"> Enter Your Username </InputLabel>
                        <Input
                            required
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
                        <InputLabel htmlFor="welcome_signup_email"> Enter Your Email </InputLabel>
                        <Input
                            required
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
                        <InputLabel htmlFor="welcome_signup_number"> Enter Your Number </InputLabel>
                        <Input
                            required
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
                        {inputBoxValue.number === "" || inputBoxValue.number.length === 10 ? "" : <p style={{ color: "red", textAlign: 'start' }}>Enter 10 digit number</p>}
                    </FormControl>

                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel variant="standard" htmlFor="welcome_signup_securityQuestion1"> Security Question</InputLabel>
                        <NativeSelect
                            id="welcome_signup_securityQuestion1"
                            value={inputBoxValue.securityQuestion1}
                            onChange={handleOnChangeInputBoxValue}
                            name='securityQuestion1'
                        >
                            {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                        </NativeSelect>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel htmlFor="welcome_signup_securityAnswer1"> Security Question Answer</InputLabel>
                        <Input
                            required
                            onChange={handleOnChangeInputBoxValue}
                            name="securityAnswer1"
                            value={inputBoxValue.securityAnswer1}
                            id="welcome_signup_securityAnswer1"
                            endAdornment={
                                <IconButton style={{ width: "40px" }}>
                                    <QuestionMarkIcon />
                                </IconButton>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel variant="standard" htmlFor="welcome_signup_securityQuestion2"> Security Question</InputLabel>
                        <NativeSelect
                            id="welcome_signup_securityQuestion2"
                            value={inputBoxValue.securityQuestion2}
                            onChange={handleOnChangeInputBoxValue}
                            name='securityQuestion2'
                        >
                            {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                        </NativeSelect>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel htmlFor="welcome_signup_securityAnswer2"> Security Question Answer</InputLabel>
                        <Input
                            required
                            onChange={handleOnChangeInputBoxValue}
                            name="securityAnswer2"
                            value={inputBoxValue.securityAnswer2}
                            id="welcome_signup_securityAnswer21"
                            endAdornment={
                                <IconButton style={{ width: "40px" }}>
                                    <QuestionMarkIcon />
                                </IconButton>
                            }
                        />
                    </FormControl>

                    <Stack direction="row" spacing={1} style={{ margin: "auto" }}>

                        <Button type='submit'>Reset Password</Button>
                        <Button onClick={() => setOpenFromDialogResetPassword(false)}>Cancel</Button>

                    </Stack>
                </form> */}
                <HorizontalNonLinearStepper />
            </DialogContent>
        </Dialog>
    )
}

export default ResetPassword


const forgotPasswordQuestionsList = [
    "What is your favorite movie?",
    "What is the first and last name of your first boyfriend or girlfriend?",
    "Which phone number do you remember most from your childhood?",
    "What was your favorite place to visit as a child?",
    "Who is your favorite actor, musician, or artist?",
    "What is the name of your favorite pet?",
    "In what city were you born?",
    "What high school did you attend?",
    "What is the name of your first school?",
    "What is your mother's maiden name?",
    "What street did you grow up on?",
    "What was the make of your first car?",
    "When is your anniversary?",
    "What is your favorite color?",
    "What is your father's middle name?",
    "What is the name of your first grade teacher?",
    "What was your high school mascot?",
    "Which is your favorite web browser?",
    "what is your favorite website?",
    "what is your favorite forum?",
    "what is your favorite online platform?",
    "what is your favorite social media website?"
]