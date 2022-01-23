import { connect } from "react-redux";
import { State, User } from "store/state/singleChat";
import { useEffect, useState } from "react";
import {
  sendMessage,
  addFriend,
  pullFriendList,
  setMessageListHasRead,
} from "store/actions/singleChat";

import { UserList } from "../components/chat/UserList";
import { ChatMessageWindow } from "../components/chat/ChatMessageWindow";

interface ChatProps {
  sendMessage(data: any): void;
  addFriend(data: User): void;
  pullFriendList(data: string): void;
  setMessageListHasRead(data: User,targetUser:User): void;
}

const Chat = (props: State & ChatProps) => {
  const { sendMessage, pullFriendList, setMessageListHasRead } = props;
  const { friendList, user } = props;

  useEffect(() => {
    pullFriendList(user.id);
  }, [user.id, pullFriendList]);

  // 当前聊天窗口展示的用户聊天记录
  const [targetUser, setTargetUser] = useState(
    [...friendList.values()][0] || null
  );

  useEffect(() => {
    window.TATGET_USER = targetUser;
  }, [targetUser]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "300px" }}>
          <UserList
            friendList={[...friendList.values()]}
            host={user}
            setTargetUser={setTargetUser}
          ></UserList>
        </div>
        <div style={{ flex: "1" }}>
          <ChatMessageWindow
            setMessageListHasRead={setMessageListHasRead}
            sendMessage={sendMessage}
            targetUser={targetUser}
            host={user}
          ></ChatMessageWindow>
        </div>
      </div>
    </div>
  );
};

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state: State) => {
  return {
    ...state,
  };
};

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage(data: any) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(sendMessage(data));
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
            dispatch({ type: 'SET_PAGE_TITLE', data: data })
        )*/
    },
    addFriend(data: User) {
      dispatch(addFriend(data));
    },
    pullFriendList(id: string) {
      dispatch(pullFriendList(id));
    },

    setMessageListHasRead(user: User,targetUser:User) {
      dispatch(setMessageListHasRead(user,targetUser));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
