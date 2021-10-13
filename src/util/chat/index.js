import sockjs from "socket.io-client";
import {singleChat}  from '../../store/const/singleChat'

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
  socket.on("receiveStatus", (data) => {
    console.log(data);
  });

  return socket;
};

export const createSocket = (store) => {
  const socket = connectSocket();
  // 初始化 state
  store.dispatch({ type: singleChat.INIT_CHAT_STATE })
  socket.on("receiveSingleMessage", (data) => {
    console.log(data);
    store.dispatch( { type: singleChat.RECEIVE_MESSAGE, data: JSON.parse(data) });
  });
  const connection = (userId) => {
    socket.emit("connection", {
      userId,
    });
  };

  const sendMessage = ({ userId, targetUserId, message , createTime ,isRead}) => {
    socket.emit("singleChat", {
      userId,
      targetUserId,
      message,
      createTime,
      isRead,
    });
  };
  const CHAT_BASIC = {
    connection,
    sendMessage,
    socket,
  };
  return CHAT_BASIC;
};
