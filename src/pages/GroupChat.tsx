import { GroupList } from "components/groupchat/groupLIst";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GroupMessage, State } from "store/state/singleChat";
import {
  pullGroup,
  pullGroupChatMessage,
  sendGroupMessage,
  updateGroupMessageId,
} from "store/actions/groupChat";
import { GroupChatWindow } from "components/groupchat/groupChatWindow";

interface GroupChatProps {
  pullGroupList(data: string): void;
  sendMessage(data: any): void;
  updateGroupMessageId(data: any): void;
  pullGroupMessage(data:{roomId: string ; take:number ; skip:number | undefined ; startId:number | undefined}):void;
}

const GroupChat = (props: State & GroupChatProps) => {
  const {
    friendList,
    user,
    pullGroupList,
    groupList,
    sendMessage,
    updateGroupMessageId,
    skipMap,
    pullGroupMessage,
    messageIdMap,
  } = props;
  useEffect(() => {
    pullGroupList(user.id);
  }, [user.id, pullGroupList]);

  const [targetRoom, setTargetRoom] = useState(
    [...groupList.values()][0] || null
  );

  useEffect(() => {
    window.TARGET_ROOM = targetRoom;
  }, [targetRoom]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ width: "300px" }}>
        <GroupList
          id={user.id}
          friendList={[...friendList.values()]}
          groupList={[...groupList.values()]}
          setTargetRoom={setTargetRoom}
        ></GroupList>
      </div>
      <div style={{ flex: "1", paddingLeft: "20px", paddingRight: "20px" }}>
        <GroupChatWindow
          messageIdMap={messageIdMap}
          pullGroupMessage={pullGroupMessage}
          updateGroupMessageId={updateGroupMessageId}
          id={user.id}
          room={targetRoom}
          user={user}
          sendMessage={sendMessage}
          skipMap={skipMap}
        ></GroupChatWindow>
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
    pullGroupList(id: string) {
      dispatch(pullGroup(id));
    },
    sendMessage(data: GroupMessage) {
      dispatch(sendGroupMessage(data));
    },
    updateGroupMessageId(data: { roomId: string; id: number }) {
      dispatch(updateGroupMessageId(data));
    },
    pullGroupMessage(data:{roomId: string ; take:number ; skip:number | undefined ; startId: number | undefined}){
      dispatch(pullGroupChatMessage(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);
