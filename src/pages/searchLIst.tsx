import React, { useState } from "react";
import { useDebounce } from "../util/index";
import { useMount } from "../util/index";
import { List } from "./components/list";
import { Search } from "./components/search";
export const SearchList = () => {
  const [list] = useState(["小米", "腾讯", "华为", "百度"]);
  const [name, setName] = useState("");
  const debounceName = useDebounce(name,1000)
  useMount(()=>{
      console.log('start')
  })
  return (
    <div>
      <Search name={name} setName={setName}></Search>
      <List list={list} name={debounceName}></List>
    </div>
  );
};
