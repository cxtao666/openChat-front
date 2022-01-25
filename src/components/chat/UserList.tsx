import React, { useState } from "react";
import { FriendList } from "./FriendList";
import { UserSearch } from "./UserSearch";
import { Friend, User } from "../../store/state/singleChat";

interface ListProps {
  friendList: Friend[];
  host: User;
  setTargetUser: any;
}
export const UserList = ({ friendList, host, setTargetUser }: ListProps) => {
  const [name, setName] = useState("");
  return (
    <div style={{ border: "1px solid #f0f0f0", height: "1000px" }}>
      <UserSearch name={name} setName={setName}></UserSearch>
      <FriendList
        host={host}
        friendList={friendList}
        searchFriendName={name}
        setTargetUser={setTargetUser}
      ></FriendList>
    </div>
  );
};