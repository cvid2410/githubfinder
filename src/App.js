import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data, loading: false });
  }
  //search users on github

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //search Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { searchUsers, clearUsers, setAlert } = this;
    const { users, loading, alert } = this.state;
    return (
      <div>
        <div className="container ">
          <Navbar title="GitHub Finder" icon="fab fa-github mr-2" />
          <Alert alert={alert} />
          <Search
            searchUsers={searchUsers}
            clearUsers={clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={setAlert}
          />
          <div className="card-columns">
            <User loading={loading} users={users} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
