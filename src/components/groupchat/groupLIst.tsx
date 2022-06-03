import React, { useEffect, useState } from "react";
import { Modal, Button, Avatar, message, List } from "antd";
import { UserSearch } from "components/chat/UserSearch";
import { AddGroup } from "./addGroup";
import { CreateGroup } from "./createGroup";
import { Friend, Group, Room, User } from "store/state/singleChat";
import FriendListCss from "../chat/FriendList.module.css";
import { timeStampToString } from "util/time";
import { judeFileType } from "util/upload/judeFileType";
import { getAddGroupRequest } from "api/getAddGroupRequest";
import { rejectAddRoom } from "api/rejectAddRoom";

interface GroupListProps {
  id: string;
  friendList: Friend[];
  groupList: Group[];
  setTargetRoom(data: any): void;
}

export const GroupList = ({
  id,
  friendList,
  groupList,
  setTargetRoom,
}: GroupListProps) => {
  const [name, setName] = useState("");
  const [isShowAddGroupModal, setIsShowAddGroupModal] = useState(false);
  const [isShowCreateGroupModal, setIsShowCreateGroupModal] = useState(false);
  const [isShowMemberRequest, setIsShowMemberRequest] = useState(false);
  const [memberRequestlist, setMemberRequestlist] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      getAddGroupRequest(id).then((data: any) => {
        if (data && data.length > 0) {
          /*  notification.open({
            message: "入群消息",
            description: "收到新的入群消息",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          }); */
        }
        setMemberRequestlist(data);
      });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });

  const showModal = () => {
    setIsShowAddGroupModal(true);
  };

  const handleOk = () => {
    setIsShowAddGroupModal(false);
  };

  const handleCancel = () => {
    setIsShowAddGroupModal(false);
  };
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          border: "1px solid #f0f0f0",
          paddingLeft: "20px",
          paddingRight: "20px",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <UserSearch
            name={name}
            setName={setName}
            placeholder="输入群聊名称"
          ></UserSearch>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Button
            type="primary"
            size="large"
            block={true}
            onClick={() => {
              showModal();
            }}
          >
            添加群聊
          </Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Button
            type="primary"
            size="large"
            block={true}
            onClick={() => {
              setIsShowCreateGroupModal(true);
            }}
          >
            发起群聊
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            block={true}
            onClick={() => {
              setIsShowMemberRequest(true);
            }}
          >
            群申请管理{memberRequestlist.length > 0 ? "(有新的入群申请)" : ""}
          </Button>
        </div>
        <div>
          <div style={{ marginTop: "10px" }}>
            {name === "" ? (
              <List
                itemLayout="horizontal"
                dataSource={groupList}
                renderItem={(item) => {
                  if (
                    !item.groupMessageList ||
                    item.groupMessageList.length === 0
                  ) {
                    return (
                      <div
                        className={FriendListCss.item}
                        onClick={() => {
                          setTargetRoom(item);
                        }}
                      >
                        <Avatar src={item.room.avator} size="large"></Avatar>;
                        <div>
                          <div style={{ display: "flex" }}>
                            <h2>{item.room.roomUsername}</h2>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={FriendListCss.item}
                      onClick={() => {
                        setTargetRoom(item);
                      }}
                    >
                      <Avatar src={item.room.avator} size="large"></Avatar>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{ marginLeft: "5px", marginRight: "5px" }}
                          >
                            {item.room.roomUsername}
                          </div>
                          {timeStampToString(
                            item.groupMessageList[
                              item.groupMessageList.length - 1
                            ].createTime
                          )}
                        </div>
                        <div
                          style={{
                            marginLeft: "5px",
                            marginRight: "5px",
                            color: "#00000073",
                          }}
                        >
                          {
                            item.groupMessageList[
                              item.groupMessageList.length - 1
                            ].user.nickname
                          }
                          :
                          {item.groupMessageList[
                            item.groupMessageList.length - 1
                          ].msgId === ""
                            ? item.groupMessageList[
                                item.groupMessageList.length - 1
                              ].message
                            : judeFileType(
                                item.groupMessageList[
                                  item.groupMessageList.length - 1
                                ].msgId
                              )}
                          {item.groupMessageList[
                            item.groupMessageList.length - 1
                          ].id > item.newMessageId ? (
                            <span style={{ color: "red" }}> [未读消息]</span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            ) : (
              <div>{groupList.find((value)=>{})}</div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="添加群聊"
        visible={isShowAddGroupModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="关闭"
        okText="确定"
      >
        <AddGroup id={id}></AddGroup>
      </Modal>

      <Modal
        title="创建群聊"
        visible={isShowCreateGroupModal}
        onOk={() => {
          setIsShowCreateGroupModal(false);
        }}
        onCancel={() => {
          setIsShowCreateGroupModal(false);
        }}
        cancelText="关闭"
        okText="确定"
      >
        <CreateGroup id={id} friendList={friendList}></CreateGroup>
      </Modal>
      <Modal
        title="群申请管理"
        visible={isShowMemberRequest}
        onOk={() => {
          setIsShowMemberRequest(false);
        }}
        onCancel={() => {
          setIsShowMemberRequest(false);
        }}
        cancelText="关闭"
        okText="确定"
      >
        {memberRequestlist.map(
          (item: {
            user: User;
            room: Room;
            message: string;
            dateTime: string;
          }) => {
            return (
              <div>
                <div>{item.message}</div>
                <div>
                  <Avatar src={item.user.avatar}></Avatar>
                  {item.user.nickname} 申请加入 {item.room.roomUsername}
                  <Button
                    onClick={() => {
                      window.CHAT_BASIC.joinRoomChat(item);
                      message.info("已经同意对方加入群聊");
                    }}
                  >
                    同意
                  </Button>
                  <Button
                    onClick={() => {
                      rejectAddRoom({
                        roomId: item.room.id as string,
                        userId: item.user.id as string,
                      });
                    }}
                  >
                    拒绝
                  </Button>
                </div>
                <p>{item.dateTime}</p>
              </div>
            );
          }
        )}
      </Modal>
    </div>
  );
};
