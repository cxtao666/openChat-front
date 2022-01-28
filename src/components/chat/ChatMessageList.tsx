import { Message, User } from "store/state/singleChat";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import { throttle } from "util/index";
import { timeStampToString } from "util/time";
import { createEvent } from "util/event";
import { ShowFile } from "./ShowFile";

// 允许使用鼠标进行滚动
BScroll.use(MouseWheel);

interface ChatMessageListProps {
  messageList: Message[];
  user: User;
  targetUser: User;
  setMessageListHasRead(data: User, targetUser: User): void;
  pullConcatMessage(
    id: string,
    targetUserId: string,
    skip: number,
    take: number
  ): void;
  skipMap: Map<string, number>; // 用于存储拉取的联系人的页表
  hasSendMessage: boolean;
}

//进来的时候已经拉了10条消息，所以进来并不会去后台请求消息，当用户往上拉到顶，再去后端请求消息，同时把页的消息存起来。

export const ChatMessageList = ({
  messageList,
  user,
  targetUser,
  setMessageListHasRead,
  pullConcatMessage,
  skipMap,
  hasSendMessage,
}: ChatMessageListProps) => {
  const [isToLoadingData, setIsToLoadingData] = useState(false);
  useEffect(() => {
    setMessageListHasRead(user, targetUser);
    //   pullConcatMessage(user.id, targetUser.id, skip, 10); //去后端拉取和联系人的消息
  }, [user, targetUser, setMessageListHasRead, pullConcatMessage]);

  useEffect(() => {
    let bs = new BScroll(".wrapper", {
      scrollY: true,
      probeType: 3,
      mouseWheel: true,
    });
    bs.refresh();
    async function onScroll(pos: { x: number; y: number }) {
      console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
      if (pos.y >= -20 && isToLoadingData === false) {
        if (!skipMap.has(targetUser.id)) {
          skipMap.set(targetUser.id, 1);
        }
        const skip = skipMap.get(targetUser.id);
        console.log("进来了", skip);
        console.log("到顶部了");
        setIsToLoadingData(true);
        pullConcatMessage(user.id, targetUser.id, skip as number, 10); //去后端拉取和联系人的消息
        setTimeout(() => {
          skipMap.set(targetUser.id, (skip as number) + 1);
          console.log("更新skip", skipMap.get(targetUser.id));
          setIsToLoadingData(false);
          bs.refresh();
        }, 4000);
      }
    }
    //做个节流
    bs.on("scroll", throttle(onScroll, 1000));
    console.log("执行到底部");
    bs.scrollToElement(".end", 0, 0, 0);
    createEvent().on("refreshList", () => {
      // 收到了消息，重新计算列表高度 
        bs.refresh();
      //todo  可以提示以下用户有新的消息进来
      message.info("有新消息");
    });
    return () => {
      bs.destroy();
    };
  }, [user, targetUser, hasSendMessage]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>{isToLoadingData ? "加载历史消息中" : ""}</div>
      </div>

      <div
        className="wrapper"
        style={{ height: "430px", position: "relative", overflow: "hidden" }}
      >
        <div>
          {messageList.map((item) => {
            return (
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {timeStampToString(item.createTime)}
                </div>
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
                    {item.msgId !== "" ? (
                      <ShowFile type={item.msgId} url={item.message}></ShowFile>
                    ) : (
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
                    )}
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
                    {item.msgId !== "" ? (
                      <ShowFile type={item.msgId} url={item.message}></ShowFile>
                    ) : (
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
                    )}

                    <Avatar src={user.avatar} alt="" size="large"></Avatar>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="end"></div>
      </div>
    </div>
  );
};
