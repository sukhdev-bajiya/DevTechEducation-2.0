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
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

import { NativeSelect } from '@mui/material';
import { Stack } from '@mui/system';



function ResetUsername() {
    const steps = ['User Detail', 'Security Question', 'Reset Username'];
    const [openFromDialogResetUsername, setOpenFromDialogResetUsername] = React.useState(true);

    const [inputUserDetail, setInputBoxUserDetail] = React.useState({
        email: "",
        number: ""
    });

    // Key press input part
    const handleOnChangeInputBoxUserDetail = (e) => {
        const { name, value } = e.target;
        setInputBoxUserDetail({ ...inputUserDetail, [name]: value });
    };

    const inputUserDetailStep1 = (event) => {
        event.preventDefault();
        setInputBoxUserDetail({
            email: "",
            number: "",
        })
        handleComplete()
    }

    const [inputBoxSecurityQuestion, setInputBoxSecurityQuestion] = React.useState({
        securityAnswer1: "",
        securityAnswer2: "",
        securityQuestion1: "What is your favorite movie?",
        securityQuestion2: "Who is your favorite actor, musician, or artist?"
    });

    // Key press input part
    const handleOnChangeInputBoxSecurityQuestion = (e) => {
        const { name, value } = e.target;
        setInputBoxSecurityQuestion({ ...inputBoxSecurityQuestion, [name]: value });
    };

    const inputUserDetailStep2 = (event) => {
        event.preventDefault();
        setInputBoxSecurityQuestion({
            securityAnswer1: "",
            securityAnswer2: "",
            securityQuestion1: "What is your favorite movie?",
            securityQuestion2: "Who is your favorite actor, musician, or artist?"
        })
        handleComplete()
    }

    const [inputBoxNewUsername, setInputBoxNewUsername] = React.useState({
        username: ""
    });

    // Key press input part
    const handleOnChangeInputBoxNewUsername = (e) => {
        const { name, value } = e.target;
        setInputBoxNewUsername({ ...inputBoxNewUsername, [name]: value });
    };

    const inputUserDetailStep3 = (event) => {
        event.preventDefault();
        setInputBoxNewUsername({
            username: ""
        })
        handleComplete()
    }


    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };
    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setOpenFromDialogResetUsername(false)
    };

    return (
        <Dialog open={openFromDialogResetUsername} >
            <DialogTitle style={{ textAlign: "center", fontSize: "28px", fontWeight: "600" }}> Reset Username </DialogTitle>
            <DialogContent style={{ display: "flex", justifyContent: "center" }}>

                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit">
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Box>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    Your username successfully updated!
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Close</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1, py: 1 }} style={{ display: "flex", justifyContent: "center" }}>
                                    {activeStep === 0 ?
                                        <form className='welcome_resetusername_formOutsideBox' onSubmit={inputUserDetailStep1}>
                                            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                <InputLabel htmlFor="welcome_resetusername_email"> Enter Your Email </InputLabel>
                                                <Input
                                                    required
                                                    type='email'
                                                    onChange={handleOnChangeInputBoxUserDetail}
                                                    name="email"
                                                    value={inputUserDetail.email}
                                                    id="welcome_resetusername_email"
                                                    endAdornment={
                                                        <IconButton style={{ width: "40px" }}>
                                                            <MailIcon />
                                                        </IconButton>
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                <InputLabel htmlFor="welcome_resetusername_number"> Enter Your Number </InputLabel>
                                                <Input
                                                    required
                                                    type='number'
                                                    onChange={handleOnChangeInputBoxUserDetail}
                                                    name="number"
                                                    value={inputUserDetail.number}
                                                    id="welcome_resetusername_number"

                                                    endAdornment={
                                                        <IconButton style={{ width: "40px" }}>
                                                            <PhoneIcon />
                                                        </IconButton>
                                                    }
                                                />
                                                {inputUserDetail.number === "" || inputUserDetail.number.length === 10 ? "" : <p style={{ color: "red", textAlign: 'start' }}>Enter 10 digit number</p>}
                                            </FormControl>
                                            <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                                                <Button type='submit'>Next Step</Button>
                                                <Button onClick={handleReset}>Close</Button>
                                            </Stack>
                                        </form>
                                        : activeStep === 1 ?
                                            <form className='welcome_resetusername_formOutsideBox' onSubmit={inputUserDetailStep2}>
                                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                    <InputLabel variant="standard" htmlFor="welcome_resetusername_securityQuestion1"> Security Question</InputLabel>
                                                    <NativeSelect
                                                        id="welcome_resetusername_securityQuestion1"
                                                        value={inputBoxSecurityQuestion.securityQuestion1}
                                                        onChange={handleOnChangeInputBoxSecurityQuestion}
                                                        name='securityQuestion1'
                                                        disabled
                                                    >
                                                        {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                                                    </NativeSelect>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                    <InputLabel htmlFor="welcome_resetusername_securityAnswer1"> Security Question Answer</InputLabel>
                                                    <Input
                                                        required
                                                        onChange={handleOnChangeInputBoxSecurityQuestion}
                                                        name="securityAnswer1"
                                                        value={inputBoxSecurityQuestion.securityAnswer1}
                                                        id="welcome_resetusername_securityAnswer1"
                                                        endAdornment={
                                                            <IconButton style={{ width: "40px" }}>
                                                                <QuestionMarkIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                    <InputLabel variant="standard" htmlFor="welcome_resetusername_securityQuestion2"> Security Question</InputLabel>
                                                    <NativeSelect
                                                        id="welcome_resetusername_securityQuestion2"
                                                        value={inputBoxSecurityQuestion.securityQuestion2}
                                                        onChange={handleOnChangeInputBoxSecurityQuestion}
                                                        name='securityQuestion2'
                                                        disabled
                                                    >
                                                        {forgotPasswordQuestionsList.map((ques, index) => <option key={index} value={ques}>{ques}</option>)}
                                                    </NativeSelect>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                    <InputLabel htmlFor="welcome_resetusername_securityAnswer2"> Security Question Answer</InputLabel>
                                                    <Input
                                                        required
                                                        onChange={handleOnChangeInputBoxSecurityQuestion}
                                                        name="securityAnswer2"
                                                        value={inputBoxSecurityQuestion.securityAnswer2}
                                                        id="welcome_resetusername_securityAnswer2"
                                                        endAdornment={
                                                            <IconButton style={{ width: "40px" }}>
                                                                <QuestionMarkIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                </FormControl>
                                                <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                                                    <Button type='submit'>Next Step</Button>
                                                    <Button onClick={handleReset}>Close</Button>
                                                </Stack>
                                            </form>
                                            :
                                            <form className='welcome_resetusername_formOutsideBox' onSubmit={inputUserDetailStep3}>
                                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                                    <InputLabel htmlFor="welcome_resetusername_username"> Enter New Username </InputLabel>
                                                    <Input
                                                        required
                                                        onChange={handleOnChangeInputBoxNewUsername}
                                                        name="username"
                                                        value={inputBoxNewUsername.username}
                                                        id="welcome_resetusername_username"
                                                        endAdornment={
                                                            <IconButton style={{ width: "40px" }}>
                                                                <AccountCircle />
                                                            </IconButton>
                                                        }
                                                    />
                                                </FormControl>
                                                <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
                                                    <Button type='submit'>Update Username</Button>
                                                    <Button onClick={handleReset}>Close</Button>
                                                </Stack>
                                            </form>
                                    }
                                </Typography>

                            </React.Fragment>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ResetUsername


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