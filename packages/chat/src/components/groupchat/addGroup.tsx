import React, { useEffect, useState } from "react";
import { UserSearch } from "components/chat/UserSearch";
import { searchGroup } from "api/searchGroup";
import Avatar from "antd/lib/avatar/avatar";
import { Button, Drawer } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { requestAddGroup } from "api/requestAddGroup";

interface AddGroupProps {
  id: string;
}

export const AddGroup = ({ id }: AddGroupProps) => {
  const [roomId, setroomId] = useState("");
  const [list, setList] = useState([] as any);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (roomId !== "") {
      const request = async () => {
        const data = await searchGroup(roomId);
        if (data) {
          setList([data as never]);
        } else {
          setList([]);
        }
      };
      request();
    }
  }, [roomId]);
  return (
    <div style={{ height: "100%" }}>
      <UserSearch
        name={roomId}
        setName={setroomId}
        placeholder="搜索群号/群名称"
      ></UserSearch>
      {list.map((item: any) => {
        return (
          <div
            style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
          >
            <Avatar src={item.avator} size="large"></Avatar>
            <div style={{ marginLeft: "10px" }}>
              <h2 style={{ marginBottom: "0px" }}>{item.roomUsername}</h2>
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                公告：{item.notice}
              </div>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                加入
              </Button>
            </div>
          </div>
        );
      })}
      <Drawer
        title="群聊验证"
        placement={"top"}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={"top"}
      >
        <TextArea
          placeholder="请输入验证信息"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></TextArea>
        <Button
          style={{ marginTop: "10px" }}
          onClick={async () => {
            await requestAddGroup({ roomId: list[0].id, userId: id, message });
            onClose();
          }}
        >
          确认
        </Button>
      </Drawer>
    </div>
  );
};
