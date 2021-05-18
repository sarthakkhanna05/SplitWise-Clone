import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as config from "../config";

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

const SettleUpPerson = ({ balance, user, group }) => {
  const classes = useStyles();

  // const calculatePersonalTotal()

  const calculateTotal = (bal) => {
    let total = 0;
    bal.map((group) => {
      total = total + Object.values(group)[0];
    });
    return total.toFixed(2);
  };

  const getUsers = async () => {
    // console.log(user);
    setName((value) => getNameFromId(Object.keys(balance)[0]));
    setTotal((value) => calculateTotal(Object.values(balance)[0]));
    setGroups((value) => Object.values(balance)[0]);
  };

  // useEffect(() => {
  //   console.log("call");
  //   getUsers();
  // }, [name, total, groups]);

  const getGroupFromId = (na) => {
    // console.log(na);

    const n = group.find((users) => {
      if (String(na) === String(users._id)) {
        // console.log(users);
        return users;
      }
    });
    return n.name;
  };

  const getNameFromId = (na) => {
    const n = user.find((users) => {
      if (String(na) === String(users._id)) {
        // console.log(users);
        return users;
      }
    });
    return n.first_name;
  };

  const handleClick = () => {
    alert("You have Settled Up!");
    console.log(balance);
  };

  const [name, setName] = useState(getNameFromId(Object.keys(balance)[0]));
  const [total, setTotal] = useState(calculateTotal(Object.values(balance)[0]));
  const [groups, setGroups] = useState(Object.values(balance)[0]);

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
          <Typography variant="subtitle1">You</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {total >= 0 ? "Lent" : "Owe"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`USD ${Math.abs(
            total
          )}`}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Settle
          </Button>
        </Grid>
      </Grid>

      {/* <hr style={{ margin: 20 }} /> */}
      {/* <AccordionDetails>
            {<Note className={classes.note} note={transactions[0]}></Note>}
          </AccordionDetails> */}
      {/* {notes !== [] &&
            notes.map((note) => (
              <AccordionDetails>
                <Note className={classes.note} note={note}></Note>
              </AccordionDetails>
            ))} */}
      {/* </Paper> */}
    </div>
  );
};

export default SettleUpPerson;
