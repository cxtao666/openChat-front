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
  placeholder:string;
}

export const UserSearch = ({ name, setName ,placeholder}: SearchProps) => {
  return (
    <div>
      <Search
        placeholder={placeholder}
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
