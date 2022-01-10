import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

interface SearchProps {
  name: string;
  setName: (value: string) => void;
}

export const UserSearch = ({ name, setName }: SearchProps) => {
  return (
    <div
      style={{
        paddingTop: "20px",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "20px",
      }}
    >
      <Search
        placeholder="输入用户昵称"
        allowClear
        enterButton
        size="large"
        suffix={suffix}
        onSearch={(val) => {
          setName(val);
        }
      }
      />
    </div>
  );
};
