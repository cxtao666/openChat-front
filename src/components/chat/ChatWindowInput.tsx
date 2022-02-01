import { useState } from "react";
import { Upload, message, Progress, Button ,Modal} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { getUploadToken } from "api/getUploadToken";
import { QiNiuConfig } from "util/upload/qiniu";
import { judeFileType } from "util/upload/judeFileType";
import { Recorder } from "./Recorder";
import { getRandomNumber } from "util/upload/getRandomNumber";
import Picker from "emoji-picker-react";

const { Dragger } = Upload;

interface ChatWindowInputProps {
  userId: string;
  targetUserId: string;
  sendMessage(data: any): void;
  setMode(data: any): void;
  setHasSendMessage(data: boolean): void;
  hasSendMessage: boolean;
}

let token: string;

// 发送消息，调用websocket，并且消息存入本地
export const ChatWindowInput = ({
  userId,
  targetUserId,
  sendMessage,
  setMode,
  setHasSendMessage,
  hasSendMessage,
}: ChatWindowInputProps) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [userMessage, setMessage] = useState("");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
 //   console.log(chosenEmoji);
    setMessage(userMessage+emojiObject.emoji)
  };
  
  const props = {
    name: "file",
    multiple: true,
    action: QiNiuConfig.action,
    showUpLoadList: false,
    onChange(info: any) {
      const { event } = info;
      if (event) {
        // 必定要加判断，否则会报错
        let percent = Math.floor((event.loaded / event.total) * 100);
        setPercent(percent);
        console.log(percent); // percent就是进度条的数值
      }
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const imageKey = info.file.response.key;
        const uploadUrl = QiNiuConfig.prefix + imageKey;
        console.log(uploadUrl);
        setPercent(0);
        sendMessage({
          userId,
          targetUserId,
          message: uploadUrl,
          msgId: info.file.type !== "" ? info.file.type : "file",
        });
        setHasSendMessage(!hasSendMessage);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    data(file: any) {
      // 如果要发送的文件是前端可以解析的，那么可以改文件名为时间戳格式，如果是前端不能解析的，那么保留文件名
      const now = getRandomNumber();
      const type =
        judeFileType(file.type) === "[文件]" ? now + "." + file.name : now;
      return {
        token,
        key: type,
      };
    },
    async beforeUpload() {
      token = (await getUploadToken()) as string;
    },
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Picker onEmojiClick={onEmojiClick} pickerStyle={{width:"100%"}} disableSearchBar={true} />
      </Modal>
      <div style={{ position: "relative", height: "110px" }}>
        {/* */}
        <Button
          type="primary"
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            borderRadius: "5px",
          }}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          表情
        </Button>
        <textarea
          style={{ width: "100%", height: "110px", paddingTop: "30px" }}
          value={userMessage}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            borderRadius: "5px",
          }}
        >
          <Recorder
            setPercent={setPercent}
            sendMessage={sendMessage}
            userId={userId}
            targetUserId={targetUserId}
            setHasSendMessage={setHasSendMessage}
            hasSendMessage={hasSendMessage}
          ></Recorder>
        </div>

        <Button
          type="primary"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            borderRadius: "5px",
          }}
          onClick={() => {
            // 空消息不能发
            if (userMessage === "") {
              message.info("请输入消息后再发送");
              return;
            }
            sendMessage({
              userId,
              targetUserId,
              message: userMessage,
              msgId: "",
            });
            setMessage("");
            setHasSendMessage(!hasSendMessage);
          }}
        >
          发送
        </Button>
        <Button
          type="primary"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            borderRadius: "5px",
          }}
          onClick={() => {
            setMode(false);
          }}
        >
          音视频通话
        </Button>
      </div>
      <div>{percent === 0 ? "" : <Progress percent={percent}></Progress>}</div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
      </Dragger>
    </div>
  );
};
