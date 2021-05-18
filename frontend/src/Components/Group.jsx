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
import Button from "@material-ui/core/Button";
import Transaction from "./Transaction/Transaction";
import AddTransaction from "./Transaction/AddTransaction";
import ToolBar from "./ToolBar";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import * as config from "../config";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     maxWidth: 345,
  //   },
  //   media: {
  //     height: 0,
  //     paddingTop: "56.25%", // 16:9
  //   },
  //   expand: {
  //     transform: "rotate(0deg)",
  //     marginLeft: "auto",
  //     transition: theme.transitions.create("transform", {
  //       duration: theme.transitions.duration.shortest,
  //     }),
  //   },
  //   expandOpen: {
  //     transform: "rotate(180deg)",
  //   },
  //   avatar: {
  //     backgroundColor: red[500],
  //   },
}));

const Group = () => {
  //   const [date, setDate] = useState("");
  //   const [amount, setAmount] = useState(0.0);
  //   const [description, setDescription] = useState("");
  //   const [payer, setPayer] = useState("");
  const [transactions, setTransactions] = useState([]);

  const classes = useStyles();

  const groupNames = ["Team Event", "Festival expenditure", "PG&E Bills"];

  const getTransaction = async () => {
    // const config = {
    //   method: "get",
    //   url: "http://localhost:5000/api/transaction/",
    //   data: {
    //     groupId: "606d5c345268375868beccec",
    //   },
    // };

    // localStorage.setItem("group", "608389a4355b5c481ce0f13a");

    // const transaction = await axios(config);
    const data = {
      userId: localStorage.getItem("user"),
    };
    const transaction = await axios.post(
      `${config.BASE_API_URL}transaction/usertransaction`,
      data
    );

    const t = transaction.data.filter(
      (transaction) => transaction.group_id === localStorage.getItem("group")
    );

    console.log(t);
    setTransactions(t);
  };
  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div>
      <ToolBar></ToolBar>
      {/* <AppBar position="static">
        <Toolbar variant="dense" style={{ backgroundColor: "white" }}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <TextField
              id="standard-select-currency"
              select
              // label="Select"
              value={groupName}
              //   style={{ width: 400, marginTop: 20 }}
              onChange={(e) => setGroupName(e.target.value)}
              //   helperText="Please select your TimeZone"
            >
              {groupNames.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              // label="Select"
              value={viewed}
              //   style={{ width: 400, marginTop: 20 }}
              onChange={(e) => setViewed(e.target.value)}
              //   helperText="Please select your TimeZone"
            >
              {views.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TablePagination
              component="div"
              count={transactions.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[2, 5, 10]}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Toolbar>
      </AppBar> */}
      <Typography variant="h4"></Typography>
      <Button variant="contained" color="primary" onClick={getTransaction}>
        Refresh
      </Button>
      <AddTransaction />
      {transactions.map((transaction, index) => (
        <Transaction
          style={{ marginTop: 7 }}
          key={transaction._id}
          transaction={transaction}
        ></Transaction>
      ))}
    </div>
  );
};

export default Group;
