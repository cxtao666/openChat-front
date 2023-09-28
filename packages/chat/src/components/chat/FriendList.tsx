import { useEffect, useState } from "react";
import { Friend, User } from "store/state/singleChat";
import { timeStampToString } from "util/time";
import { judeFileType } from "util/upload/judeFileType";
import FriendListCss from "./FriendList.module.css";
import { List } from "antd";

interface FriendListProps {
  friendList: Friend[];
  searchFriendName: string;
  setTargetUser: any;
  host: User;
}

export const FriendList = ({
  friendList,
  searchFriendName,
  setTargetUser,
  host,
}: FriendListProps) => {
  const [Friendlist, setList] = useState([] as Friend[]);

  // 这里是否有必要
  useEffect(() => {
    const list = [];
    for (let item of friendList) {
      list.push(item);
    }
    setList(list);
  }, [friendList, setList]);

  // 使得聊天窗口的对象发生改变
  const openChatMessageWindow = (friend: Friend | undefined) => {
    if (friend != null) {
      setTargetUser(friend);
    }
  };

  const renderFriend = (item: Friend | undefined) => {
    if (item === undefined) {
      return <div></div>;
    }

    return (
      <div
        className={FriendListCss.item}
        onClick={() => {
          openChatMessageWindow(item);
        }}
        key={item?.user.id}
      >
        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
          <img
            className={FriendListCss.avator}
            src={item?.user.avatar}
            alt=""
          ></img>
        </div>

        <div className={FriendListCss.meta}>
          <h4 className={FriendListCss.title}>
            {item?.user.nickname}{" "}
            <span>{item.isOnline ? "[在线]" : "[离线]"}</span>
          </h4>
          <div className={FriendListCss.description}>
            {item?.messageList.length !== 0
              ? item?.messageList[item.messageList.length - 1].msgId === ""
                ? item?.messageList[item.messageList.length - 1].message
                : judeFileType(
                    item?.messageList[item.messageList.length - 1].msgId
                  )
              : ""}
            <div style={{ fontSize: "8px" }}>
              {item?.messageList.length !== 0
                ? item?.messageList[item.messageList.length - 1].userId ===
                  host.id
                  ? item?.messageList[item.messageList.length - 1].isRead
                    ? ""
                    : "🍎对方未读"
                  : item?.messageList[item.messageList.length - 1].isRead
                  ? ""
                  : "🍎未读消息"
                : ""}
            </div>
          </div>
        </div>
        <div>
          {item?.messageList.length !== 0
            ? timeStampToString(
                item?.messageList[item?.messageList.length - 1].createTime
              )
            : ""}
        </div>
      </div>
    );
  };

  return (
    <div>
      {searchFriendName === "" ? (
        <List
          itemLayout="horizontal"
          dataSource={Friendlist}
          renderItem={renderFriend}
        />
      ) : (
        [
          Friendlist.find((value) => {
            if (value.user.nickname === searchFriendName) {
              return true;
            } else {
              return false;
            }
          }),
        ].map(renderFriend)
      )}
    </div>
  );
};
