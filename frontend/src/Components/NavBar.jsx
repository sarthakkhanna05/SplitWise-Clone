import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#58b89d",
  },
  navbar: {
    backgroundColor: "#58b89d",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ auth, logout }) => {
  const [name, setName] = useState(auth ? "LOGOUT" : "");
  const classes = useStyles();
  let history = useHistory();

  return (
    <div /*className={classes.root}*/>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.navbar}>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img
                src="https://www.splitwise.com/assets/press/logos/sw.svg"
                alt="Girl in a jacket"
                width="25"
                height="30"
              />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Splitwise
          </Typography>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Button
              color="inherit"
              onClick={() => {
                console.log(auth);
                if (auth) {
                  localStorage.setItem("auth", false);

                  logout("", false, "", [], {}, [{}]);

                  setName("LOGOUT");
                  // history.push("/login");
                  console.log("here");
                  localStorage.setItem("user", "");
                }
              }}
            >
              {"Logout"}
            </Button>
          </Link>
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
    logout: (userId, auth, token, groupIds, user, groups) =>
      dispatch(logout(userId, auth, token, groupIds, user, groups)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
