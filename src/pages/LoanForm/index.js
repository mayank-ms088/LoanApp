import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  colors,
  Dialog,
  Toolbar,
  IconButton,
  AppBar,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Check as CheckIcon } from "react-feather";
import { BasicInfo, CreditInfo, LoanInfo } from "./LoanInfoSteps";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent } from "@material-ui/core";
import { updateLoans } from "src/core/repo/loansRepo";
// import { updateLoans } from "src/core/repo/loansRepo";

const steps = [
  {
    label: "Basic Info",
    icon: PermIdentityIcon,
  },
  {
    label: "Credit Info",
    icon: CreditCardIcon,
  },
  {
    label: "Loan Info",
    icon: MonetizationOnIcon,
  },
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText,
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    //margin: theme.spacing(2)
  },
  appBar: {
    position: "relative",
    backgroundColor: "white",
  },
  avatar: {
    backgroundColor: colors.green[600],
  },
  stepper: {
    backgroundColor: "transparent",
  },
  block: {
    display: "block",
    marginLeft: theme.spacing(3),
    fontStyle: "italic",
  },
}));

const LoanFormView = ({ className, onClose, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [loanInfoObj, setLoanInfoObj] = useState({});
  const [basicInfoObj, setBasicInfoObj] = useState({});
  const [creditInfoObj, setCreditInfoObj] = useState({});

  const handleNext = (response) => {
    if (activeStep === 0) {
      setBasicInfoObj((prevObj) => {
        return { ...prevObj, ...response };
      });
    } else if (activeStep === 1) {
      let copyObj = { ...creditInfoObj, ...response };
      setCreditInfoObj(copyObj);
    } else if (activeStep === 2) {
      const copyObj = {
        ...basicInfoObj,
        ...creditInfoObj,
        ...loanInfoObj,
        ...response,
      };
      setLoanInfoObj((prevObj) => {
        return { ...prevObj, ...response };
      });
      onComplete(copyObj);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onComplete = async (copyObj) => {
    try {
      await dispatch(updateLoans(copyObj));
      setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={true} fullScreen classes={{ paper: classes.root }}>
      <AppBar className={classes.appBar} elevation={5}>
        <Toolbar>
          <IconButton
            edge="start"
            style={{
              color: "grey",
              marginRight: 10,
            }}
            onClick={() => {
              onClose(!completed);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            className={classes.title}
            color="textPrimary"
          >
            {"Loan Application"}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent style={{ paddingTop: 25 }}>
        {!completed ? (
          // <Paper>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Stepper
                activeStep={activeStep}
                className={classes.stepper}
                connector={<CustomStepConnector />}
                orientation="vertical"
              >
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel StepIconComponent={CustomStepIcon}>
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* {eventObj.updated_at ? (
                <Typography
                  className={classes.block}
                  variant="body2"
                  color="textSecondary"
                >
                  {(isEdit ? "Last saved: " : "Draft saved: ") +
                    utils.getDateString(eventObj.updated_at)}
                </Typography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} md={10}>
              <Box component={Paper} p={3}>
                {activeStep === 0 && <BasicInfo onNext={handleNext} />}
                {activeStep === 1 && (
                  <CreditInfo onBack={handleBack} onNext={handleNext} />
                )}
                {activeStep === 2 && (
                  <LoanInfo onBack={handleBack} onNext={handleNext} />
                )}
                {/* {activeStep === 3 && (
                                        <EventConfig
                                            selectedChannels={eventObj ? eventObj.channels : null}
                                            selectedApp={selectedApp}
                                            event={eventObj}
                                            onBack={handleBack}
                                            onComplete={handleComplete}
                                            isEdit={isEdit}
                                        />
                                    )} */}
              </Box>
            </Grid>
          </Grid>
        ) : (
          // </Paper>
          <Card>
            <CardContent>
              <Box maxWidth={450} mx="auto">
                <Box display="flex" justifyContent="center">
                  <Avatar className={classes.avatar}>
                    <CheckIcon />
                  </Avatar>
                </Box>
                <Box mt={2}>
                  <Typography variant="h3" color="textPrimary" align="center">
                    Success!
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    {"Loan Submitted!"}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      navigate("/dashboard/app");
                    }}
                  >
                    Home
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanFormView;
