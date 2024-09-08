import React, { useState, useEffect } from "react";
import UserCard from "../userCard";
import { fetchUsers } from "../../../api/userService";
import "./UserList.style.css";

const UserList = () => {
  const [listAllUsers, setListAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const users = await fetchUsers();
        setListAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="user-card-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        listAllUsers.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
};

export default UserList;
