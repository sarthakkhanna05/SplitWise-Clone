// import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import CreateGroup from "./Components/CreateGroup";
import Temp from "./Temp";
import Transaction from "./Components/Transaction/Transaction";
import RecentActivity from "./Components/Group/RecentActivity";
import NavBar from "./Components/NavBar";
import * as config from "./config";
import LandingPage from "./Components/LandingPage";
import { connect } from "react-redux";
import { login } from "./Redux/main/actions";
import ToolBar from "./Components/ToolBar";
import MyGroups from "./Components/MyGroups";
import Group from "./Components/Group";
// import { useState } from "react";
// import axios from "axios";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: config.BASE_GRAPHQL_URL })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App(/*{ auth }*/) {
  let auth = localStorage.getItem("auth");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar></NavBar>
        {/* <ToolBar></ToolBar> */}
        <Switch>
          <Route exact path="/" component={LandingPage}>
            {/* {auth && <Redirect to="/dashboard" />} */}
          </Route>
          <Route path="/signup" component={SignUp}>
            {/* {auth && <Redirect to="/dashboard" />} */}
          </Route>
          <Route path="/profile" component={Profile}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/login" component={Login}>
            {/* {auth && <Redirect to="/dashboard" />} */}
          </Route>
          <Route path="/dashboard" component={Dashboard}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/creategroup" component={CreateGroup}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/temp" component={Temp} />{" "}
          <Route path="/transaction" component={Transaction}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/recentactivity" component={RecentActivity}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/mygroupspage" component={MyGroups}>
            {!auth && <Redirect to="/" />}
          </Route>
          <Route path="/group" component={Group}>
            {!auth && <Redirect to="/" />}
          </Route>
        </Switch>{" "}
      </div>
    </ApolloProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.reducer.userId,
    auth: state.reducer.auth,
    token: state.reducer.token,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (userId, auth, token) => dispatch(login(userId, auth, token)),
//   };
// };

export default connect(mapStateToProps)(App);
