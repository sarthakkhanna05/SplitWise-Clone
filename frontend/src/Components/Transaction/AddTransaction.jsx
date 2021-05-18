import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../../config";
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
    width: 400,
    height: 400,
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

const AddTransaction = ({ AddTransactions }) => {
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
        groupId: localStorage.getItem("group"),
        userId: localStorage.getItem("user"),
        description,
        amount,
      };
      const transaction = await axios.post(
        `${config.BASE_API_URL}transaction/createtransaction`,
        data
      );
      console.log(transaction);
      setAmount(0);
      setDescription("");
      handleClose();
      setErr(false);
    }
  };

  const body = (
    <Card style={modalStyle} className={classes.root}>
      <CardHeader className={classes.header} title="Add an Expense" />
      <CardContent align="center" variant="outlined">
        <Typography variant="body1" color="textPrimary" component="p">
          With you and all of group
        </Typography>
      </CardContent>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              required
              id="standard-textarea"
              label="Description"
              placeholder="Description"
              multiline
              error={description === "" && err}
              helperText={description === "" ? "Empty field!" : " "}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                type="number"
                error={amount === 0 && err}
                helperText={amount === 0 ? "Empty field!" : " "}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
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
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={onAdd}
            >
              Add
            </Button>
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
    </Card>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add expense
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

export default AddTransaction;
