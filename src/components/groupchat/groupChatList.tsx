import Avatar from "antd/lib/avatar/avatar";
import { ShowFile } from "components/chat/ShowFile";
import { useEffect, useState } from "react";
import { GroupMessage, UserId } from "store/state/singleChat";
import { timeStampToString } from "util/time";
import MouseWheel from "@better-scroll/mouse-wheel";
import BScroll from "@better-scroll/core";
import { createEvent } from "util/event";
import { throttle } from "util/index";
import { message } from "antd";

// 允许使用鼠标进行滚动
BScroll.use(MouseWheel);

interface GroupChatListProps {
  messageList: GroupMessage[];
  userId: UserId;
  skipMap: Map<string, number>;
  roomId: string;
  pullGroupMessage(data: {
    roomId: string;
    take: number;
    skip: number | undefined;
    startId: number | undefined;
  }): void;
  messageIdMap: Map<string, number>;
}

export const GroupChatList = ({
  messageList,
  userId,
  skipMap,
  roomId,
  pullGroupMessage,
  messageIdMap,
}: GroupChatListProps) => {
  const [isToLoadingData, setIsToLoadingData] = useState(false);

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
        if (!skipMap.has(roomId)) {
          skipMap.set(roomId, 1);
        }
        const skip = skipMap.get(roomId);
        console.log("进来了", skip);
        console.log("到顶部了");
        setIsToLoadingData(true); // 异步执行
        pullGroupMessage({
          roomId,
          take: 10,
          skip: skip,
          startId: messageIdMap.get(roomId),
        }); // 异步执行
        skipMap.set(roomId, (skip as number) + 1); // 同步执行
        console.log("更新skip", skipMap.get(roomId));
        setTimeout(() => {
          setIsToLoadingData(false);
          bs.refresh();
        }, 4000);
      }
    }
    //做个节流
    bs.on("scroll", throttle(onScroll, 1000));
    console.log("执行到底部");
    bs.scrollToElement(".end", 0, 0, 0);
    createEvent().on("refreshGroupList", (data) => {
      // 收到了消息，重新计算列表高度
      bs.refresh();
      //todo  可以提示以下用户有新的消息进来
      if (!data.flag) {
        message.info("有新的消息");
      }
    });
    return () => {
      bs.destroy();
    };
  }, [roomId]);

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
                {item.userId !== userId ? (
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
                      src={item.user.avatar}
                      alt=""
                      size="large"
                      style={{ marginRight: "20px" }}
                    ></Avatar>
                    <div>
                      <div>{item.user.nickname}</div>
                      {item.msgId !== "" ? (
                        <ShowFile
                          type={item.msgId}
                          url={item.message}
                        ></ShowFile>
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "25px",
                        }}
                      >
                        <div>{item.user.nickname}</div>
                      </div>
                      {item.msgId !== "" ? (
                        <ShowFile
                          type={item.msgId}
                          url={item.message}
                        ></ShowFile>
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
                    </div>
                    <Avatar src={item.user.avatar} alt="" size="large"></Avatar>
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
