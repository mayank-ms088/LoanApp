// material
import { Stack, Button, Divider, Typography } from "@mui/material";
// component
import Iconify from "../../components/Iconify";
import { useGoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { loginUser } from "src/core/repo/userRepo";
import { useNavigate } from "react-router";
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId =
    "874221073026-q8tcjranrip4ab3qqu403kc2796d0e3o.apps.googleusercontent.com";
  const cookiePolicy = "single_host_origin";
  const onSuccess = async (profile) => {
    const copyObj = { ...profile.profileObj };
    await dispatch(loginUser(copyObj));
    navigate("/dashboard/app");
  };
  const onFailiure = (profile) => {
    navigate("/login");
  };
  const { signIn, loaded } = useGoogleLogin({
    clientId,
    cookiePolicy,
    onSuccess,
    onFailiure,
  });
  // console.log(signIn, loaded);
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => {
            console.log(1);
            signIn();
          }}
          // disabled={loaded}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Continue with&nbsp;
          </Typography>
          <Iconify icon="eva:google-fill" color="#DF3E30" height={24} />
        </Button>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </>
  );
}
