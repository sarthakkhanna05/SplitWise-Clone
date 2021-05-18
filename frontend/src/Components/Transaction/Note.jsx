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
import SvgIcon from "@material-ui/core/SvgIcon";
import { FaTimes } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  note: {
    marginLeft: 10,
  },
  paper: {
    // padding: theme.spacing(1),
    margin: "auto",
    width: "85%",
    // width: ,
    maxWidth: 500,
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

const Note = ({ note, members_involved, deleteNote }) => {
  const [date, setDate] = useState(note.timestamp);
  const [description, setDescription] = useState(note.description);
  const [member, setMember] = useState(note.member);
  //   const [memberName, setMemberName] = useState(note.member.first_name);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const onDelete = () => {
    console.log(note);
  };
  useEffect(() => {
    const newDate = new Date(Number(note.timestamp));
    console.log(note.timestamp);

    setMember((mem) =>
      members_involved.map((memb) => {
        if (String(memb._id) === String(mem)) {
          console.log(memb);
          return memb.first_name + " " + memb.last_name;
        }
      })
    );
    const time = newDate.toLocaleTimeString();
    const d = newDate.toLocaleDateString();
    setDate((value) => d + " " + time);
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={2}
        >
          <Card className={classes.paper} variant="outlined">
            <CardContent>
              <Grid
                className={classes.note}
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                // spacing={2}
              >
                <Grid item justify="flex-start">
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="textPrimary"
                        component="p"
                      >
                        {member}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                      >
                        {date}
                      </Typography>
                      <hr />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: 20 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {description}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid
            xs={1}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <FaTimes
              style={{
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => deleteNote(note._id)}
            />
            {/* <IconButton aria-label="delete" onClick={onDelete}>
              <SvgIcon>
                <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
              </SvgIcon>
            </IconButton> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Note;
