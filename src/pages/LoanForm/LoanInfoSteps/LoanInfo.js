import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import Page from "src/components/Page";
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";
import { Checkbox, FormControlLabel } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2),
  },
  tag: {
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const LoanInfo = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const [dateOpen, setDateOpen] = useState("");

  const handleDateOpen = (type) => {
    setDateOpen(type);
  };
  return (
    <Page className={classes.root} title="Basic Information">
      <Container maxWidth={false}>
        <Formik
          enableReinitialize
          initialValues={{
            loanAmount: 0.0,
            emi: 0,
            startDate: moment(Date.now()).format("DD:MM:YYYY"),
            endDate: moment(Date.now()).format("DD:MM:YYYY"),
            fixedInterest: false,
          }}
          validationSchema={Yup.object().shape({
            loanAmount: Yup.number().required("Loan Amount is required!"),
            emi: Yup.number().required("Monthly Installments are required!"),
            startDate: Yup.date().required("Start Date is required!"),
            endDate: Yup.date().required("End Date is required!"),
            fixedInterest: Yup.bool(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (onNext) {
                onNext(values);
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            touched,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={clsx(classes.root, className)}
              {...rest}
            >
              <Typography variant="h3" color="textPrimary">
                Now the Credit Information
              </Typography>
              {/* Loan Amount */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.loanAmount && errors.loanAmount)}
                  label="Loan Amount"
                  name="loanAmount"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.loanAmount || ""}
                  variant="outlined"
                />
              </Box>
              {/* Monthly Installments */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.emi && errors.emi)}
                  label="Monthly Installments"
                  name="emi"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emi || ""}
                  variant="outlined"
                />
              </Box>
              {/* Start Date */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.startDate && errors.startDate)}
                  label="Start Date"
                  name="startDate"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startDate || ""}
                  variant="outlined"
                />
              </Box>
              {/* End Date */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.endDate && errors.endDate)}
                  label="End Date"
                  name="endDate"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDate || ""}
                  variant="outlined"
                />
              </Box>
              {/* Fixed Interest Rate */}
              <Box mt={3} display="flex">
                <Typography>
                  Fixed Interest Rate:&nbsp;
                  <Checkbox
                    checked={values.fixedInterest}
                    onChange={handleChange}
                    name="fixedInterest"
                  />
                </Typography>
              </Box>
              {onNext && (
                <Box mt={6} display="flex">
                  <Box flexGrow={1} />
                  <Button
                    color="secondary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Save &amp; Next
                  </Button>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

LoanInfo.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

// LoanInfo.defaultProps = {
//   onNext: () => { },
//   onBack: () => { }
// };

export default LoanInfo;
