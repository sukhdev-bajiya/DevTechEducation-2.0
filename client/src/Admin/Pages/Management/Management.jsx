import React from 'react'
import './Management.css'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ManagementCoursesTabPages from './ManagementCourses';

function ManagementTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`management_action_tabpanel_${index}`}
            aria-labelledby={`management_action_tab_${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

ManagementTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function managementTabProps(index) {
    return {
        id: `management_action_tab_${index}`,
        'aria-controls': `management_action_tabpanel_${index}`,
    };
}


export default function Management() {
    document.title = "Dev Tech Education || Admin || Management"

    const theme = useTheme();
    const [managementValue, setManagementValue] = React.useState(0);

    const managementHandleChange = (event, newValue) => {
        setManagementValue(newValue);
    };

    const managementHandleChangeIndex = (index) => {
        setManagementValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                position: 'relative'
            }}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={managementValue}
                    onChange={managementHandleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="COURSES" {...managementTabProps(0)} />
                    <Tab label="TEACHER" {...managementTabProps(1)} />
                    <Tab label="STUDENT" {...managementTabProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={managementValue}
                onChangeIndex={managementHandleChangeIndex}
            >
                <ManagementTabPanel value={managementValue} index={0} dir={theme.direction}>
                    <ManagementCoursesTabPages />
                </ManagementTabPanel>
                <ManagementTabPanel value={managementValue} index={1} dir={theme.direction}>
                    TEACHER

                </ManagementTabPanel>
                <ManagementTabPanel value={managementValue} index={2} dir={theme.direction}>
                    STUDENT
                </ManagementTabPanel>
            </SwipeableViews>
            {managementFabs.map((fab, index) => (
                fab === null ? "" : <Zoom
                    // key={fab.color}
                    key={index}
                    in={managementValue === index}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${managementValue === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <SpeedDial
                        ariaLabel={fab.ariaLabel}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                        {fab.actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                </Zoom>
            ))}
        </Box>
    );
}

const managementFabs = [
    null,
    {
        ariaLabel: "Management Admin Teacher Menu Item",
        actions: [
            { icon: <DeleteOutlineIcon />, name: 'Delete Teacher' },
            { icon: <EditIcon />, name: 'Edit Teacher Data' },
            { icon: <PrintIcon />, name: 'Print Teacher List' },
            { icon: <AddIcon />, name: 'Add Teacher' },
        ]
    }, {
        ariaLabel: "Management Admin Student Menu Item",
        actions: [
            { icon: <DeleteOutlineIcon />, name: 'Delete Student' },
            { icon: <EditIcon />, name: 'Edit Student Data' },
            { icon: <PrintIcon />, name: 'Print Student List' },
            { icon: <AddIcon />, name: 'Add Student' },
        ]
    }];
