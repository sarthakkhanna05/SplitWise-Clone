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
import { timezone, currencies, languages } from "../timezone";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ToolBar from "./ToolBar";

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
    height: 50,
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
    width: 800,
    margin: "auto",
  },
  title: {
    textAlign: "left",
  },
  paper: {
    margin: theme.spacing(8, 4),
    // height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 150,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const appClasses = useAppStyles();

  const [edit, setEdit] = useState("true");
  const [currency, setCurrency] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [language, setLanguage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const getUser = async () => {
    const user = await axios.post(`${config.BASE_API_URL}user/getuser`, {
      userId: localStorage.getItem("user"),
    });
    console.log(user.data);
    setName((value) => user.data.first_name + " " + user.data.last_name);
    setEmail((value) => user.data.email);
    setCurrency((value) => user.data.currency);
    setTimeZone((value) => user.data.time_zone);
    setLanguage((value) => user.data.language);
    setPhone((value) => user.data.phone_number);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = async () => {
    setOpen(true);
    const data = {
      userId: localStorage.getItem("user"),
      name,
      email,
      timeZone,
      language,
      currency,
      phone,
    };
    const updatedUser = await axios.patch(
      `${config.BASE_API_URL}user/updateuser`,
      data
    );
    console.log(updatedUser.data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const [phone, setPhone] = useState("");
  // const [name, setName] = useState("");
  // const [timeZone, setTimeZone] = useState("");
  // const [language, setLanguage] = useState("");
  // const [currency, setCurrency] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <ToolBar></ToolBar>
      <div className={appClasses.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography variant="h4">Your Profile</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Name:
            </Typography>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              value={name}
              variant="outlined"
              style={{ width: 400 }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Language:
            </Typography>
            <TextField
              id="standard-select-currency"
              select
              // label="Select"
              value={language}
              style={{ width: 400, marginTop: 20 }}
              onChange={(e) => setLanguage(e.target.value)}
              helperText="Please select your Language"
            >
              {Object.keys(languages).map((option) => (
                <MenuItem key={option} value={option}>
                  {languages[option].name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Email:
            </Typography>
            <TextField
              id="outlined-basic"
              value={email}
              variant="outlined"
              style={{ width: 400 }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Time Zone:
            </Typography>
            <TextField
              id="standard-select-currency"
              select
              // label="Select"
              value={timeZone}
              style={{ width: 400, marginTop: 20 }}
              onChange={(e) => setTimeZone(e.target.value)}
              helperText="Please select your TimeZone"
            >
              {timezone.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
            id="outlined-basic"
            // label="Outlined"
            variant="outlined"
            style={{ width: 400 }}
          /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Phone:
            </Typography>
            <TextField
              id="outlined-basic"
              value={phone}
              variant="outlined"
              style={{ width: 400 }}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={appClasses.title}>
              Currency:
            </Typography>
            <TextField
              id="standard-select-currency"
              select
              // label="Select"
              value={currency}
              style={{ width: 400, marginTop: 20 }}
              onChange={(e) => setCurrency(e.target.value)}
              helperText="Please select your Currency"
            >
              {Object.keys(currencies).map((option) => (
                <MenuItem key={option} value={option}>
                  {option + " : " + currencies[option]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              color="default"
              size="medium"
              onClick={() => setEdit((value) => "true")}
            >
              Edit
            </Button>
          </Grid> */}
          <Grid item style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClick}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Saved
          </Alert>
        </Snackbar>
      </div>
    </div>

    // <div>
    //   <form action="" onSubmit={onSubmit}>
    //     <div>
    //       <label htmlFor="">Name:</label>
    //       <input
    //         type="text"
    //         name=""
    //         id=""
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">Email:</label>
    //       <input
    //         type="email"
    //         name=""
    //         id=""
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">Phone Number:</label>
    //       <input
    //         type="text"
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="">Currency:</label>
    //       <input
    //         type="text"
    //         value={currency}
    //         onChange={(e) => setCurrency(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">Time Zone:</label>
    //       <input
    //         type="text"
    //         value={timeZone}
    //         onChange={(e) => setTimeZone(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">Language:</label>
    //       <input
    //         type="text"
    //         value={language}
    //         onChange={(e) => setLanguage(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <input type="submit" value="send" />
    //     </div>
    //   </form>
    // </div>
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
export default connect(mapStateToProps)(Profile);
