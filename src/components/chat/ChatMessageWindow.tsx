import { ChatMessageList } from "./ChatMessageList";
import { ChatWindowInput } from "./ChatWindowInput";
import { Friend, User } from "../../store/state/singleChat";
import { useEffect, useState } from "react";
import { AvChat } from "pages/AvChat";
import { Modal } from "antd";
import { createEvent } from "../../util/event";
import { destroyUserCache, isReceiveVideoRequest } from "util/chat/videoCall";

interface ChatMessageWindowProps {
  targetUser: Friend;
  host: User;
  sendMessage(data: any): void;
  setMessageListHasRead(data: User, targetUser: User): void;
  pullConcatMessage(
    id: string,
    targetUserId: string,
    skip: number,
    take: number
  ): void;
  skipMap: Map<string, number>;
}

export const ChatMessageWindow = ({
  targetUser,
  host,
  sendMessage,
  setMessageListHasRead,
  pullConcatMessage,
  skipMap,
}: ChatMessageWindowProps) => {
  const [mode, setMode] = useState(true);
  const [hasSendMessage, setHasSendMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [VideoCallUser, setVideoCallUser] = useState("");
  const handleOk = () => {
    setIsModalVisible(false);
    setMode(false); //打开视频聊天组件
    isReceiveVideoRequest(true);
    /*  setTimeout(() => {
      createEvent().emit("receiveVideoCall"); //开始通信
    }, 1000); */
  };
  const handleCancel = () => {
    isReceiveVideoRequest(false);
    setIsModalVisible(false);
    createEvent().offAll("receiveVideoCall");
    destroyUserCache(); // 删掉用户缓存
  };

  useEffect(() => {
    //展示是否接受视频通话确认框
    createEvent().on("showVideoCall", (id: string) => {
      setIsModalVisible(true);
      setVideoCallUser(id); // 设置是哪个人call过来的
    });
    // 关闭视频通话组件
    /*  createEvent().on("closeVideo", () => {
      setMode(true);
    }); */
  });

  return (
    <div>
      {mode ? (
        targetUser != null ? (
          <div
            style={{
              paddingLeft: "30px",
              paddingRight: "50px",
              backgroundColor: "#fafafa",
            }}
          >
            <h2 style={{ marginTop: "10px" }}>{targetUser.user.nickname}</h2>
            <div>
              <ChatMessageList
                skipMap={skipMap}
                messageList={targetUser?.messageList}
                user={host}
                targetUser={targetUser.user}
                setMessageListHasRead={setMessageListHasRead}
                pullConcatMessage={pullConcatMessage}
                hasSendMessage={hasSendMessage}
              ></ChatMessageList>
              <ChatWindowInput
                setMode={setMode}
                userId={host.id}
                targetUserId={targetUser.user.id}
                sendMessage={sendMessage}
                hasSendMessage={hasSendMessage}
                setHasSendMessage={setHasSendMessage}
              ></ChatWindowInput>
            </div>
          </div>
        ) : (
          <h1>欢迎使用!</h1>
        )
      ) : (
        <AvChat
          targetUserId={targetUser?.user?.id}
          userId={host?.id}
          setMode={setMode}
        ></AvChat>
      )}
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>是否接受{VideoCallUser}视频通话请求</h2>
      </Modal>
    </div>
  );
};
