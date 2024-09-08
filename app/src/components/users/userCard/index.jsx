import React from "react";
import "./UserCard.style.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card" key={user.id}>
      <div className="user-name">{user.name}</div>
      <div className="user-username">{user.username}</div>
      <div className="user-email">{user.email}</div>
      <ul>
        <li className="user-address">Street: {user.address.street}</li>
        <li className="user-address">Suite: {user.address.suite}</li>
        <li className="user-address">City: {user.address.city}</li>
      </ul>
    </div>
  );
};
export default UserCard;
