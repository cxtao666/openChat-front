import React, { useState } from "react";
import { Modal, Button } from "antd";
import { UserSearch } from "components/chat/UserSearch";
import { AddGroup } from "./addGroup";
import { CreateGroup } from "./createGroup";
import { Friend } from "store/state/singleChat";

interface GroupListProps {
  id: string;
  friendList: Friend[];
}

export const GroupList = ({ id, friendList }: GroupListProps) => {
  const [name, setName] = useState("");
  const [isShowAddGroupModal, setIsShowAddGroupModal] = useState(false);
  const [isShowCreateGroupModal, setIsShowCreateGroupModal] = useState(false);

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
        }}
      >
        <UserSearch
          name={name}
          setName={setName}
          placeholder="输入群聊名称"
        ></UserSearch>
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
        <div>
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
      </div>
      <Modal
        title="添加群聊"
        visible={isShowAddGroupModal}
        onOk={handleOk}
        onCancel={handleCancel}
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
      >
        <CreateGroup id={id} friendList={friendList}></CreateGroup>
      </Modal>
    </div>
  );
};
