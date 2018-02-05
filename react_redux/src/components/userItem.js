import React from 'react';
import PropTypes from 'prop-types';

const UserItem = (props) => (
  <div className="box" onClick={props.onClick}>
    <img src={props.user.picture.thumbnail} />
    <span>{props.user.login.username}</span>
  </div>
)

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserItem;
