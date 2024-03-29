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
    <div style={{ border: "1px solid #f0f0f0", height: "100%" }}>
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "20px",
        }}
      >
        <UserSearch
          name={name}
          setName={setName}
          placeholder="输入用户昵称"
        ></UserSearch>
      </div>

      <FriendList
        host={host}
        friendList={friendList}
        searchFriendName={name}
        setTargetUser={setTargetUser}
      ></FriendList>
    </div>
  );
};
