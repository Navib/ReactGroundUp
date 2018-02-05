import React from 'react';
import Button from './button';

const UserProfile = (props) => {
  const { userProfile } = props;
  return (
    userProfile ?
    <div className="container">
      <img src={`${userProfile.picture.large}`} />
      <span>{`${userProfile.name.title}, ${userProfile.name.first}, ${userProfile.name.last}`}</span>
      <span>{userProfile.email}</span>
    </div>
    : <h1>looks like you havent selected a user</h1>
  )
}

export default UserProfile;
