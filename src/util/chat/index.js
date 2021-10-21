import sockjs from "socket.io-client";
import { singleChat } from "../../store/const/singleChat";
import { receiveRTCConnection, setAnswer , receiveCandidate } from "./videoCall";

const connectSocket = () => {
  const socket = sockjs("ws://localhost:5001", {
    transports: ["websocket"],
  });
  socket.on("reconnect_attempt", () => {
    console.log("reconnect");
    socket.transports = ["websocket", "polling", "flashsocket"];
  });
  // 重连接时出错
  socket.on("error", (attemptNumber) => {
    console.log(attemptNumber);
  });
  //连接成功走这个方法
  socket.on("connect", () => {
    console.log(socket.connected);
  });
  //报错时走这个方法
  socket.on("connect_error", (error) => {
    console.log(error);
  });
  socket.on("ping", (error) => {
    console.log("ping_include");
  });

  // 接受消息状态
  socket.on("receiveStatus", (data) => {
    console.log(data);
  });

  return socket;
};

export const createSocket = (store) => {
  const socket = connectSocket();

  // 初始化 state
  store.dispatch({ type: singleChat.INIT_CHAT_STATE });

  // 接受聊天消息
  socket.on("receiveSingleMessage", (data) => {
    console.log(data);
    store.dispatch({
      type: singleChat.RECEIVE_MESSAGE,
      data: JSON.parse(data),
    });
  });

  // 上线
  const connection = (userId) => {
    socket.emit("connection", {
      userId,
    });
  };
  
  // 发送聊天消息
  const sendMessage = ({
    userId,
    targetUserId,
    message,
    createTime,
    isRead,
  }) => {
    socket.emit("singleChat", {
      userId,
      targetUserId,
      message,
      createTime,
      isRead,
    });
  };

  // 发送视频聊天的offer
  // 需要带上 userId 和 targetUserId
  const sendOffer = ({ offer, userId, targetUserId }) => {
    socket.emit("OfferToVideoChat", { offer, userId, targetUserId });
  };
  socket.on("ReceiveVideoChatOffer", async (message) => {
    const { offer, targetUserId, userId } = JSON.parse(message);
    await receiveRTCConnection(targetUserId, userId, offer);
  });

  const sendAnswer = ({ answer, userId, targetUserId }) => {
    socket.emit("answerToVideoChat", { answer, userId, targetUserId });
  };

  const sendCandidate = (data) => {
    socket.emit("candidateToVideoChat", data);
  }

  socket.on("ReceiveVideoChatAnswer", (message) => {
    const { answer } = JSON.parse(message)
    setAnswer(answer);
  });

  socket.on('ReceiveVideoChatCandidate',(data)=>{
    receiveCandidate(JSON.parse(data))
  })

  const CHAT_BASIC = {
    connection,
    sendMessage,
    socket,
    sendOffer,
    sendAnswer,
    sendCandidate
  };
  return CHAT_BASIC;
};
