import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import * as config from "../config";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../Redux/main/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#58b89d",
  },
  navbar: {
    backgroundColor: "blue",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ToolBar = ({ auth }) => {
  const classes = useStyles();

  return (
    <div /*className={classes.root}*/>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.navbar}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.title}>
                Dashboard
              </Typography>
            </Link>
            <Link
              to="/recentactivity"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.title}>
                Recent Activity
              </Typography>
            </Link>
            <Link
              to="/profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.title}>
                Profile
              </Typography>
            </Link>
            <Link
              to="/mygroupspage"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.title}>
                My Groups Page
              </Typography>
            </Link>
            <Link
              to="/creategroup"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.title}>
                CreateGroup
              </Typography>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.reducer.userId,
    auth: state.reducer.auth,
    token: state.reducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (userId, auth, token) => dispatch(logout(userId, auth, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
