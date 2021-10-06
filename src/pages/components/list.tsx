import React from "react";

interface ListProps {
  list: string[];
  name: string;
}
export const List = ({ list, name }: ListProps) => {
  return (
    <div>
      {list.map((item) => {
        return item !== name ? <div key={item}>{item}</div> : "";
      })}
    </div>
  );
};
