import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IndividualBlance from "./IndividualBlance";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import * as config from "../config";
import SettleUp from "./SettleUp";
import { connect } from "react-redux";
import ToolBar from "./ToolBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
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

const useAppStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    maxWidth: 500,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "grey",
  },
}));

const Dashboard = ({ userId, groupsData, userData }) => {
  const classes = useStyles();
  const appClasses = useAppStyles();

  const [name, setName] = useState([]);
  const [mainBalance, setMainBalance] = useState({});
  const [members, setMembers] = useState({});
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});

  const getUsers = async () => {
    const user = await axios.get(`${config.BASE_API_URL}user/`);
    setUser((value) => user.data);
    const group = await axios.get(`${config.BASE_API_URL}group/`);
    setGroup((value) => group.data);
    const balance = getbalances(group.data);
    const members = getMembers(balance);
    setMembers((value) => members);
    const mainBalance = getMainBalance(members, balance);
    setMainBalance((value) => mainBalance);
    // console.log(mainBalance);
    // console.log(user.data);
    // console.log(balance);

    // const totalBalance = {};
    // for (let member in mainBalance) {
    //   let total = 0;
    //   // console.log("*****************")
    //   mainBalance[member].map((groups) => {
    //     total = total + groups[Object.keys(groups)];
    //   });
    //   totalBalance[member] = total;
    //   console.log(
    //     `You ${total >= 0 ? "get back" : "owe"} ${member}  USD ${Math.abs(
    //       total
    //     )}`
    //   );
    // }
    // console.log(totalBalance);

    let users = user.data;
    users = user.data.map((use) => use.first_name);
    // console.log(users);
    setName((value) => [...users]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getbalances = (groups) => {
    const balances = {};
    groups.map((group) => {
      let balance = {};
      for (let name in group.balances) {
        if (String(name) === localStorage.getItem("user")) {
          balance = group.balances[name];
        }
      }
      balances[group._id] = balance;
    });
    return balances;
  };

  const getMembers = (balance) => {
    const members = [];
    for (let g in balance) {
      for (let names in balance[g]) {
        if (!members.find((member) => names === member)) {
          members.push(names);
        }
      }
    }
    return members;
  };

  const getMainBalance = (members, balance) => {
    const mainBalance = {};
    members.map((member) => {
      const person = [];
      for (let g in balance) {
        const groups = balance[g];
        const balances = {};
        for (let names in groups) {
          if (names === member) {
            if (groups[names] !== 0) balances[g] = groups[names];
          }
        }
        if (Object.keys(balances).length !== 0) person.push(balances);
      }
      mainBalance[member] = person;
    });
    return mainBalance;
  };

  return (
    <div>
      <ToolBar></ToolBar>
      {/* {() => {
        for (let i in mainBalance) {
          const bal = {};
          bal[i] = mainBalance[i];
          <IndividualBlance mainBalance={bal}></IndividualBlance>;
        }
      }} */}
      {/* {asas} */}
      <div className={appClasses.root}>
        <AppBar position="static">
          <Toolbar className={appClasses.navbar}>
            <Typography variant="h6" className={appClasses.title}>
              Dashboard
            </Typography>
            <Typography variant="h6" className={appClasses.title}></Typography>
            <SettleUp
              balance={mainBalance}
              user={user}
              group={group}
            ></SettleUp>
            {/* <Button variant="contained" color="secondary" size="medium">
              Settle Up
            </Button> */}
          </Toolbar>
        </AppBar>
      </div>
      {Object.keys(mainBalance).map((i) => {
        const bal = {};
        bal[i] = mainBalance[i];
        return (
          <IndividualBlance
            balance={bal}
            user={user}
            group={group}
          ></IndividualBlance>
        );
      })}
    </div>
    // <Grid container component="main" className={classes.root}>
    //   <CssBaseline />
    //   <Grid item xs={false} sm={4} md={7} className={classes.image} />
    //   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //     <div className={classes.paper}>
    //       <Avatar className={classes.avatar}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <form className={classes.form} noValidate>
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //         />
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           color="primary"
    //           className={classes.submit}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //         <Box mt={5}>
    //           <Copyright />
    //         </Box>
    //       </form>
    //     </div>
    //   </Grid>
    // </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.reducer.userId,
    auth: state.reducer.auth,
    token: state.reducer.token,
    userData: state.reducer.user,
    groupsData: state.reducer.groups,
  };
};
export default connect(mapStateToProps)(Dashboard);
