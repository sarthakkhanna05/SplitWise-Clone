import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import axios from "axios";
import * as config from "../config";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 0;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
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
    // backgroundSize: "fit",
    height: "94vh",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginLeft: 100,
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

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.image}>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          size="large"
          className={classes.button}
          style={getModalStyle()}
          variant="contained"
          color="secondary"
        >
          Login
        </Button>
      </Link>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button
          size="large"
          className={classes.button}
          style={getModalStyle()}
          variant="contained"
          color="secondary"
        >
          Sign Up
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;
