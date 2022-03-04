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

export const BasicInfo = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <Page className={classes.root} title="Basic Information">
      <Container maxWidth={false}>
        <Formik
          enableReinitialize
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contact_no: "",
            address: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required!"),
            lastName: Yup.string().required("LastName is required!"),
            email: Yup.string()
              .email("Email Must be valid!")
              .required("Email is Required!"),
            contact_no: Yup.string().matches(
              phoneRegExp,
              "Phone number must be valid!"
            ),
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
                Let's start with the Basic Information
              </Typography>
              {/* First Name */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.firstName && errors.firstName)}
                  label="First Name"
                  name="firstName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName || ""}
                  variant="outlined"
                />
              </Box>
              {/* Last Name */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.lastName && errors.lastName)}
                  label="Last Name"
                  name="lastName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName || ""}
                  variant="outlined"
                />
              </Box>
              {/* Email */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.email && errors.email)}
                  label="Email"
                  name="email"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  variant="outlined"
                />
              </Box>
              {/* Contact */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.contact_no && errors.contact_no)}
                  label="Contact"
                  name="contact_no"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_no || ""}
                  variant="outlined"
                />
              </Box>
              {/* Address */}
              <Box mt={3}>
                <TextField
                  style={{ width: "40%" }}
                  error={Boolean(touched.address && errors.address)}
                  label="Address"
                  name="address"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address || ""}
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

BasicInfo.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

// BasicInfo.defaultProps = {
//   onNext: () => { },
//   onBack: () => { }
// };

export default BasicInfo;
