import React, { useEffect, useState } from "react";
import { useMount } from "util";
import { List } from "./components/list";
import { Search } from "./components/search";
export const SearchList = () => {
  const [list] = useState(["小米", "腾讯", "华为", "百度"]);
  const [name, setName] = useState("");
  useEffect(() => {
      console.log(name)
  }, [name]);
  useMount(()=>{
      console.log('start')
  })
  return (
    <div>
      <Search name={name} setName={setName}></Search>
      <List list={list} name={name}></List>
    </div>
  );
};
