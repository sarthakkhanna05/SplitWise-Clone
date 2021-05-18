import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../config";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { login } from "../Redux/main/actions";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../GraphQL/Queries";
import { LOGIN_USER } from "../GraphQL/Mutations";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={`${config.BASE_URL}`}>
        Hanish_Splitwise
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage:
      "url(http://ixd.prattsi.org/wp-content/uploads/2020/02/Splitwise-Featured-Image-01-2048x1024.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "fit",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setauth] = useState(false);
  const [message, setMessage] = useState();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const classes = useStyles();

  // const { error, loading, data } = useQuery(GET_ALL_USERS);
  const [loginUser, loginResult] = useMutation(LOGIN_USER);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage();
    const data = {
      email,
      password,
    };

    // loginUser({ variables: { email, password } });
    // console.log(loginResult);
    // return;

    const result = await axios.post(
      `${config.BASE_API_URL}${config.LOGIN_URL}`,
      data
    );
    if (result.data.auth) {
      const token = result.data.data.token;
      const userId = result.data.data.user._id;

      const groupIds = result.data.data.user.groups.map((group) => group._id);
      // const groupIds = result.data.data.groups.map((group) => group._id);
      setauth(true);
      localStorage.setItem("user", userId);
      localStorage.setItem("auth", true);
      // config.login();
      history.push("/dashboard");
      login(
        userId,
        true,
        token,
        groupIds,
        result.data.data.user,
        result.data.data.user.groups
      );
    } else {
      setauth(false);
      setMessage(result.data.error);
      setOpen(true);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        {message && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.reducer.userId,
    auth: state.reducer.auth,
    token: state.reducer.token,
    user: state.reducer.user,
    groups: state.reducer.groups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, auth, token, groupIds, user, groups) =>
      dispatch(login(userId, auth, token, groupIds, user, groups)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
