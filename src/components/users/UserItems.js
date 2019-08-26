import React from "react";
import PropTypes from "prop-types";

const UserItems = ({ user: { avatar_url, login, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        className="card-img-top rounded-circle mx-auto"
        style={{ width: "60px" }}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{login}</h5>
        <a className="btn btn-primary" href={html_url}>
          Profile
        </a>
      </div>
    </div>
  );
};

UserItems.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItems;
