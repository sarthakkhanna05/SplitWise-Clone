import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ToolBar from "./ToolBar";
import * as config from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const CreateGroup = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [invite, setInvite] = useState([]);
  const [emails, setEmails] = useState([]);
  const [creator, setCreator] = useState("");
  const [groupName, setGroupName] = useState("");
  const [err, setErr] = useState(false);

  let history = useHistory();

  const handleClick = () => {
    while (invite.length !== emails.length) {
      emails.shift();
    }
    setEmails((value) => emails);
    setInvite([...invite, invite.length + 1]);
  };

  const onDelete = (id, email) => {
    console.log(email);
    setInvite(invite.filter((Id) => Id !== id));
    setEmails(emails.filter((Id) => Id !== email));
  };

  const addEmail = (email) => {
    setEmails((e) => [...e, email]);
    console.log(emails);
  };
  const getUsers = async () => {
    const user = await axios.get(`${config.BASE_API_URL}user/`);
    setUsers((users) => [...user.data]);
    const userr = user.data.filter(
      (userrr) => userrr._id === localStorage.getItem("user")
    );
    setCreator((value) => userr[0]);
  };

  const onCreateGroup = async () => {
    if (groupName === "") {
      setErr(true);
      return;
    }
    while (invite.length !== emails.length) {
      emails.shift();
    }
    setEmails((value) => emails);
    const result = await axios.post(`${config.BASE_API_URL}group/creategroup`, {
      emails,
      name: groupName,
      creator,
    });
    if (result.data) {
      history.push("/dashboard");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <ToolBar></ToolBar>
      <CssBaseline />
      <Container fixed>
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography className={classes.heading}>Group Name</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-full-width"
              label="Required*"
              style={{ margin: 8 }}
              placeholder="Group Name"
              error={err}
              helperText={err ? "Group Name is required" : " "}
              value={groupName}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setGroupName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid
              item
              className={classes.root}
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <TextField
                  id="standard-read-only-input"
                  value={`${creator.first_name} ${creator.last_name}`}
                  defaultValue={`${creator.first_name} ${creator.last_name}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 300 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-read-only-input"
                  value={creator.email}
                  defaultValue={creator.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 300 }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {invite.map((id) => (
              <Invite
                key={id}
                id={id}
                onDelete={onDelete}
                users={users}
                addEmail={addEmail}
              />
            ))}
          </Grid>
          <Grid item>
            <Button
              onClick={handleClick}
              // className={}
              // variant="contained"
              color="primary"
            >
              + Add a Person
            </Button>
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <Button
              onClick={onCreateGroup}
              // // className={}
              variant="contained"
              color="primary"
            >
              Create Group
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Invite = ({ id, onDelete, users, addEmail }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const OnNameChange = (event, newValue) => {
    if (newValue) {
      setName(`${newValue.first_name} ${newValue.last_name}`);
      const selectedUser = users.filter(
        (user) => user.first_name === newValue.first_name
      );
      // console.log(selectedUser);
      setEmail((value) => selectedUser[0].email);
    }
  };

  const OnEmailChange = (event, newValue) => {
    if (newValue) {
      setEmail((value) => newValue.email);
      const selectedUser = users.filter(
        (user) => user.email === newValue.email
      );
      // console.log(selectedUser);
      setName(
        (value) => `${selectedUser[0].first_name} ${selectedUser[0].last_name}`
      );
      addEmail(email);
    }
  };

  return (
    <Grid
      item
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Autocomplete
          id="combo-box-demo"
          inputValue={name}
          options={users}
          getOptionLabel={(user) => user.first_name + " " + user.last_name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          onChange={OnNameChange}
          // onChange={(event, newValue) => {
          //   setName(`${newValue.first_name} ${newValue.last_name}`);
          // }}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          id="combo-box-demo"
          inputValue={email}
          placeholder="name"
          options={users}
          getOptionLabel={(user) => user.email}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          onChange={OnEmailChange}
        />
      </Grid>
      <Grid item>
        <FaTimes
          style={{
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => onDelete(id, email)}
        />
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
