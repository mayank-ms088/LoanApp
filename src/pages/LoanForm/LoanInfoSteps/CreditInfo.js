import React from "react";
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

export const CreditInfo = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  return (
    <Page className={classes.root} title="Basic Information">
      <Container maxWidth={false}>
        <Formik
          enableReinitialize
          initialValues={{
            monthlyIncome: "",
            accNo: "",
            bankName: "",
            ifsc: "",
            officeAddress: "",
          }}
          validationSchema={Yup.object().shape({
            monthlyIncome: Yup.number()
              .integer()
              .required("Monthly Income is required!"),
            accNo: Yup.number()
              .integer()
              .required("Account Number is required is required!"),
            bankName: Yup.string().required("Bank Name is required!"),
            ifsc: Yup.string().required("IFSC Code is required"),
            officeAddress: Yup.string().required("Office Address is required"),
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
              {/* Monthly Income */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.monthlyIncome && errors.monthlyIncome)}
                  label="Monthly Income"
                  name="monthlyIncome"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.monthlyIncome || ""}
                  variant="outlined"
                />
              </Box>
              {/* Account No. */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.accNo && errors.accNo)}
                  label="Account Number"
                  name="accNo"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accNo || ""}
                  variant="outlined"
                />
              </Box>
              {/* Bank Name */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.bankName && errors.bankName)}
                  label="Bank Name"
                  name="bankName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bankName || ""}
                  variant="outlined"
                />
              </Box>
              {/* IFSC Code*/}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.ifsc && errors.ifsc)}
                  label="IFSC Code"
                  name="ifsc"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ifsc || ""}
                  variant="outlined"
                />
              </Box>

              {/* Office Address */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.officeAddress && errors.officeAddress)}
                  label="Office Address"
                  name="officeAddress"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.officeAddress || ""}
                  variant="outlined"
                />
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

CreditInfo.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

// EventName.defaultProps = {
//   onNext: () => { },
//   onBack: () => { }
// };

export default CreditInfo;
