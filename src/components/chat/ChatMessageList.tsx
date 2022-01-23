import { Message, User } from "store/state/singleChat";
import { Avatar } from "antd";
import { useEffect, useRef } from "react";
import { pullChatMessage } from "api/pullChatMessage";

interface ChatMessageListProps {
  messageList: Message[];
  user: User;
  targetUser: User;
  setMessageListHasRead(data: User, targetUser: User): void;
}

export const ChatMessageList = ({
  messageList,
  user,
  targetUser,
  setMessageListHasRead,
}: ChatMessageListProps) => {
  useEffect(() => {
    setMessageListHasRead(user, targetUser);
    pullChatMessage(user.id, targetUser.id, 0, 10); //去后端拉取和联系人的消息
  }, [user, targetUser, setMessageListHasRead]);

  const messagesEndRef = useRef(null);

  /*   useEffect(() => {
    if (messageList.length > 10) {
      const el: any = messagesEndRef?.current;
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList.length]); */

  return (
    <div style={{ height: "546px", overflowY: "auto", position: "relative" }}>
      <div>
        {messageList.map((item) => {
          return (
            <div>
              {item.targetUserId === user.id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <Avatar
                    src={targetUser.avatar}
                    alt=""
                    size="large"
                    style={{ marginRight: "20px" }}
                  ></Avatar>
                  <div
                    style={{
                      marginRight: "20px",
                      textAlign: "center",
                      padding: "10px",
                      backgroundColor: "#ececec",
                      borderRadius: "10%",
                      fontWeight: "bold",
                      wordWrap: "break-word",
                      wordBreak: "normal",
                      maxWidth: "300px",
                    }}
                  >
                    {item.message}            
                  </div>
                  <div>
                  <span>[{item.isRead ? "消息已读" : "🍎消息未读"}]</span>
                  </div>              
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <div>
                  <span>[{item.isRead ? "对方已读" : "🍎对方未读"}]</span>
                  </div>
                  <div
                    style={{
                      marginRight: "20px",
                      textAlign: "center",
                      padding: "10px",
                      backgroundColor: "#1890ff",
                      borderRadius: "10%",
                      fontWeight: "bold",
                      maxWidth: "300px",
                      wordWrap: "break-word",
                      wordBreak: "normal",
                    }}
                  >            
                    {item.message}
                  </div>
                  <Avatar src={user.avatar} alt="" size="large"></Avatar>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{ height: 0, position: "absolute", bottom: "0px" }}
        ref={messagesEndRef}
      ></div>
    </div>
  );
};
