import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
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

const MyGroups = () => {
  const classes = useStyles();
  const appClasses = useAppStyles();

  const [invitations, setInvitations] = useState([{}]);
  //   const [userId,setUserId] = useStaate("");
  //   const [invitationNames,setInvitationNames] = useState([]);
  const [groups, setGroups] = useState([]);

  const acceptInvite = async (id) => {
    const result = await axios.patch(
      `${config.BASE_API_URL}user/acceptinvitation`,
      {
        userId: localStorage.getItem("user"),
        invitationId: id,
      }
    );
    console.log(result.data);
    setInvitations((value) => {
      const g = value.filter((val) => val._id !== id);
      if (!g) {
        return [{}];
      } else {
        return g;
      }
    });
  };

  const getInvititations = async () => {
    setInvitations((value) => [{}]);
    const invites = await axios.post(`${config.BASE_API_URL}user/invitation`, {
      userId: localStorage.getItem("user"),
    });
    console.log(invites.data);
    if (invites.data.length > 0) {
      const group = await axios.get(`${config.BASE_API_URL}group/`);
      invites.data.map((i) => {
        group.data.map((g) => {
          //   console.log(i);
          console.log(g._id);
          if (String(i) === String(g._id)) {
            console.log(i);
            setInvitations((value) => [
              ...value,
              {
                id: i,
                name: g.name,
              },
            ]);
          }
        });
      });
      console.log(invitations);
    }
  };

  const getGroups = async () => {
    const user = await axios.post(`${config.BASE_API_URL}user/getuser`, {
      userId: localStorage.getItem("user"),
    });
    if (user.data) {
      if (user.data.groups.length > 0) {
        setGroups((value) => user.data.groups);
      }
    }
  };

  useEffect(() => {
    getInvititations();
    getGroups();
  }, []);

  return (
    <div>
      <ToolBar></ToolBar>
      <div className={appClasses.root} style={{ marginTop: 10 }}>
        <Typography variant="h6" className={appClasses.title}>
          Invitations
        </Typography>
        {invitations.map(
          (invite, index) =>
            index > 0 && (
              <PeronsalInvite
                key={invite.id}
                invite={invite}
                acceptInvite={acceptInvite}
              ></PeronsalInvite>
            )
        )}
        <hr />
        <Typography variant="h6" className={appClasses.title}>
          Groups
        </Typography>
        {groups.map((group, index) => (
          <IndividualGroup
            key={group._id}
            group={group}
            // acceptInvite={acceptInvite}
          ></IndividualGroup>
        ))}
        <Button onClick={getInvititations}>Refresh</Button>
      </div>
    </div>
  );
};

export const PeronsalInvite = ({ invite, acceptInvite }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 480,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
      marginBottom: 10,
    },
    note: {
      width: "100%",
    },
    paper: {
      // padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    noteDescription: {
      width: 400,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    gs: {
      marginBottom: 10,
    },
  }));
  const classes = useStyles();
  const [id, setId] = useState(invite.id);
  const [name, setName] = useState(invite.name);

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper} variant="outlined"> */}
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="subtitle1">{name}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => acceptInvite(id)}
          >
            Accept
          </Button>
        </Grid>
      </Grid>
      <hr style={{ margin: 20 }} />
    </div>
  );
};

export const IndividualGroup = ({ group }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 480,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
      marginBottom: 10,
    },
    note: {
      width: "100%",
    },
    paper: {
      // padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    noteDescription: {
      width: 400,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    gs: {
      marginBottom: 10,
    },
  }));
  const classes = useStyles();
  const [id, setId] = useState(group._id);
  const [name, setName] = useState(group.name);

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper} variant="outlined"> */}
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Link to="/group" style={{ color: "black", textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              onClick={(e) => localStorage.setItem("group", id)}
            >
              {name}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("You have successfully exited the group")}
          >
            Leave
          </Button>
        </Grid>
      </Grid>
      <hr style={{ margin: 20 }} />
    </div>
  );
};

export default MyGroups;
