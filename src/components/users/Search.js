import React from "react";
import PropTypes from "prop-types";

export class Search extends React.Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    }
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleText"> Enter name to search: </label>
            <input
              type="text"
              name="text"
              className="form-control"
              id="exampleText"
              placeholder="Enter text"
              value={this.state.text}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            {" "}
            Submit{" "}
          </button>
        </form>
        {showClear && (
          <button type="button" className="btn btn-light" onClick={clearUsers}>
            Reset Query
          </button>
        )}
      </div>
    );
  }
}

export default Search;
