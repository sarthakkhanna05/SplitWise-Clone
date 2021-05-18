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
import * as config from "../../config";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Note from "./Note";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

const Transaction = ({ transaction }) => {
  const getDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toDateString().split(" ");
  };
  const note = {
    description: "This is a note",
    timestamp: "02/05/2021",
    member: "Hanish",
  };
  const [date, setDate] = useState(getDate(transaction.timestamp));
  // const [notes, setNotes] = useState(mainNotes);

  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.description);
  const [noteDescription, setNoteDescription] = useState("");
  const [notes, setNotes] = useState(
    transaction.notes ? transaction.notes : []
  );
  const [payer, setPayer] = useState(transaction.payer);
  const [payerName, setPayerName] = useState(transaction.payer.first_name);
  const [expanded, setExpanded] = React.useState(false);

  const addNote = async (e) => {
    // e.preventDefault();
    const userId = localStorage.getItem("user");
    const result = await axios.post(
      `${config.BASE_API_URL}note/addnote`,

      { userId, transactionId: transaction._id, description: noteDescription }
    );
    console.log(`${config.BASE_API_URL}note/addnote`);
    console.log(result.data.savedNote);
    if (result.data.savedNote) {
      setNotes((value) => [...value, result.data.savedNote]);
      setNoteDescription("");
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    // e.preventDefault();
    const transactionId = transaction._id;
    const result = await axios.post(
      `${config.BASE_API_URL}note/deletenote`,

      { transactionId, noteId }
    );
    console.log(`${config.BASE_API_URL}note/addnote`);
    console.log(result.data);
    if (result.data.deletedNote) {
      setNotes((value) => {
        const g = value.filter((val) => val._id !== noteId);
        if (!g) {
          return [];
        } else {
          return g;
        }
      });
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(transaction);
  }, []);

  const classes = useStyles();

  const balance = `${payerName} payed USD${amount} and you owe USD${
    amount / transaction.members_involved.length
  }`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined">
        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={2}
            >
              <Grid
                xs
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="subtitle1">{date[0]}</Typography>
                <Typography variant="subtitle1">{date[2]}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
              >
                <Grid item xs container direction="column" alignItems="center">
                  <Typography gutterBottom variant="subtitle1">
                    {description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`${payerName} paid USD ${amount}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="subtitle1">
                  {payer._id === localStorage.getItem("user")
                    ? `You get back`
                    : `You owe`}
                </Typography>
                <Typography variant="subtitle1">
                  {payer._id === localStorage.getItem("user")
                    ? `USD ${
                        amount - amount / transaction.members_involved.length
                      }`
                    : `USD ${amount / transaction.members_involved.length}`}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <hr style={{ margin: 20 }} />
          {/* <AccordionDetails>
            {<Note className={classes.note} note={transactions[0]}></Note>}
          </AccordionDetails> */}
          {notes.length > 0 &&
            notes.map((note) => (
              <AccordionDetails>
                <Note
                  deleteNote={deleteNote}
                  key={note._id}
                  className={classes.note}
                  note={note}
                  members_involved={transaction.members_involved}
                ></Note>
              </AccordionDetails>
            ))}
          {/* <AccordionDetails>
            <Note className={classes.note} note={note}></Note>
          </AccordionDetails>
          <AccordionDetails>
            <Note className={classes.note} note={note}></Note>
          </AccordionDetails>
          <AccordionDetails>
            <Note className={classes.note} note={note}></Note>
          </AccordionDetails> */}
          <hr style={{ margin: 20 }} />

          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                className={classes.noteDescription}
                id="outlined-textarea"
                label="Add Note"
                placeholder="Note Description"
                multiline
                value={noteDescription}
                variant="outlined"
                required
                onChange={(e) => setNoteDescription((value) => e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={addNote}
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Add Note
              </Button>
            </Grid>
          </Grid>
        </Accordion>
      </Paper>
    </div>
  );
};

export default Transaction;
