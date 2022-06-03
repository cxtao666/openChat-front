import { Button, Form, Input, List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Room, UserId } from "store/state/singleChat";

interface GroupMemberListProps {
  room: Room;
  userId: UserId;
  setVisible(flag: boolean): void;
}

export const GroupMemberList = ({
  room,
  userId,
  setVisible,
}: GroupMemberListProps) => {
  return (
    <Form  layout="vertical">
      <div>
        <strong>群聊成员({room.joinGroupUserList.length})</strong>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {room.joinGroupUserList.map((item) => {
          return (
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "5px",
                textAlign: "center",
              }}
            >
              <Avatar src={item.avatar}></Avatar>
              <p>{item.nickname}</p>
            </div>
          );
        })}
      </div>
      <Form.Item label="群聊名称">
        <Input disabled value={room.roomUsername} />
      </Form.Item>
      <Form.Item label="群号">
        <Input disabled value={room.roomName} />
      </Form.Item>
      <Form.Item label="群公告">
        <Input disabled value={room.notice} />
      </Form.Item>
      <Form.Item>
        {room.masterId === userId ? (
          <Button
            style={{width:"100%"}}
            type="primary" danger
            onClick={() => {
              window.CHAT_BASIC.dissolutionRoomChat({
                roomId: room.id,
                userId: userId,
              });
              setVisible(false);
            }}
          >
            解散群聊
          </Button>
        ) : (
          <Button
          type="primary" danger
          style={{width:"100%"}}
            onClick={() => {
              window.CHAT_BASIC.leaveRoomChat({
                roomId: room.id,
                userId: userId,
              });
              setVisible(false);
            }}
          >
            删除并退出
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
