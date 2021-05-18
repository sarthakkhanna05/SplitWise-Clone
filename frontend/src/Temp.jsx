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
import IndividualBlance from "./Components/IndividualBlance";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { timezone, currencies, languages } from "./timezone";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TablePagination from "@material-ui/core/TablePagination";

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

const Temp = () => {
  const appClasses = useAppStyles();

  const [edit, setEdit] = useState("true");
  const [currency, setCurrency] = useState("USD");
  const [timeZone, setTimeZone] = useState("Pacific Standard Time");
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = React.useState(false);

  const arr = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [items, setItems] = useState(arr);
  const [shownItems, setShownItems] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    setShownItems((newPage + 1) * rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage((prev) => {
      return event.target.value;
    });
    console.log(rowsPerPage);

    setPage(0);
    setShownItems(event.target.value);
    // console.log(shownItems);
  };

  return (
    <div>
      <TablePagination
        component="div"
        count={arr.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div className={appClasses.root}>
        <Grid container spacing={8}>
          {arr.map(
            (id) =>
              id < shownItems &&
              id >= shownItems - rowsPerPage && (
                <Grid item xs={12} style={{ marginTop: 20 }}>
                  <Typography variant="h4">{id}</Typography>
                </Grid>
              )
          )}
        </Grid>
      </div>
    </div>
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
export default connect(mapStateToProps)(Temp);
