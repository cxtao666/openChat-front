import React from "react";

interface SearchProps{
    name:string,
    setName:(value:string)=> void
}


export const Search = ({name,setName}:SearchProps) => {
    return <input value={name} onChange={e=>{setName(e.target.value)}}></input>
}