import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../config";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
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
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import SettleUpPerson from "./SettleUpPerson";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    width: 500,
    height: 600,
  },
  header: {
    backgroundColor: "#58b89d",
    color: "white",
  },
  footer: {
    marginTop: 10,
    marginRight: 5,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const SettleUp = ({ balance, user, group }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = useState("");
  const [err, setErr] = useState(false);

  const handleOpen = () => {
    setDescription("");
    setOpen(true);
    setAmount(0);
    setErr(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDescription("");
    setAmount(0);
    setErr(false);
  };

  const onAdd = async () => {
    if (description === "" || amount === 0) {
      setErr(true);
    } else {
      const data = {
        groupId: "606d5c345268375868beccec",
        userId: config.USER,
        description,
        amount,
      };
      const transaction = await axios.post(
        "http://localhost:5000/api/transaction//createtransaction",
        data
      );
      setAmount(0);
      setDescription("");
      handleClose();
      setErr(false);
    }
  };

  const body = (
    <Card style={modalStyle} className={classes.root}>
      <CardHeader className={classes.header} title="Settle Up with" />
      <CardContent>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            {Object.keys(balance).map((i) => {
              const bal = {};
              bal[i] = balance[i];
              return (
                <SettleUpPerson
                  balance={bal}
                  user={user}
                  group={group}
                ></SettleUpPerson>
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions align="right">
        <Grid
          className={classes.footer}
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
          spacing={4}
        >
          <Grid item>
            {/* <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={onAdd}
            >
              Add
            </Button> */}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              size="medium"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      {/*  */}
    </Card>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        onClick={handleOpen}
      >
        Settle Up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SettleUp;
