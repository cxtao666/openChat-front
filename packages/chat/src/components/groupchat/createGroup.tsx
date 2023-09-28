import Avatar from "antd/lib/avatar/avatar";
import React, { useState } from "react";
import { Friend } from "store/state/singleChat";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Upload, message, Button, Checkbox, List } from "antd";
import { QiNiuConfig } from "util/upload/qiniu";
import { getRandomNumber } from "util/upload/getRandomNumber";
import { getUploadToken } from "api/getUploadToken";
import { createRoom } from "api/createRoom";
const { TextArea } = Input;

interface CreateGroupProps {
  id: string;
  friendList: Friend[];
}

export const CreateGroup = ({ id, friendList }: CreateGroupProps) => {
  const [joinGroupUserList, setJoinGroupUserList] = useState([] as any[]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomUserName, setRoomUserName] = useState("");
  const [notice, setNotice] = useState("");
  const [url, setUrl] = useState("");

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const imageKey = info.file.response.key;
      const uploadUrl = QiNiuConfig.prefix + imageKey;
      setUrl(uploadUrl);

      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  // 获取勾选的拉入群聊的好友的id
  function onChange(checkedValues: any[]) {
    console.log("checked = ", checkedValues);
    setJoinGroupUserList(checkedValues);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>群聊头像</div>
    </div>
  );
  return (
    <div style={{ height: "100%" }}>
      <div>
        <Input
          placeholder="群名称"
          value={roomUserName}
          onChange={(e) => {
            setRoomUserName(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={QiNiuConfig.action}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          data={async (file: any) => {
            // 如果要发送的文件是前端可以解析的，那么可以改文件名为时间戳格式，如果是前端不能解析的，那么保留文件名
            const token = (await getUploadToken()) as string;
            const now = getRandomNumber();
            return {
              token,
              key: now,
            };
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>

      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <List
          itemLayout="horizontal"
          dataSource={friendList}
          renderItem={(item) => {
            return (
              <div style={{ display: "flex", padding: "10px" , alignItems:"center"}}>
                <Checkbox value={item.user.id}></Checkbox>
                <Avatar
                  src={item.user.avatar}
                  alt=""
                  size="large"
                  style={{ marginRight: "10px", marginLeft:"10px" }}
                ></Avatar>
                <div>{item.user.nickname}</div>
              </div>
            );
          }}
        />
      </Checkbox.Group>

      <TextArea
        placeholder="请输入群聊备注"
        value={notice}
        onChange={(e) => {
          setNotice(e.target.value);
        }}
      ></TextArea>
      <Button
        style={{ marginTop: "10px" }}
        onClick={async () => {
          const room = await createRoom({
            masterId: id,
            roomName: ` ${getRandomNumber()}`,
            roomUsername: roomUserName,
            notice,
            avator: url,
            joinGroupUserList,
          });
          window.CHAT_BASIC.createRoomChat({
            roomId: room.id,
            masterId: id,
            userList: joinGroupUserList,
          });
        }}
      >
        提交
      </Button>
    </div>
  );
};
