import React from "react";
export const Search = ({name,setName}) => {
    function handleInputFn(e){
        setName(e.target.value)
    }
    return <input value={name} onInput={handleInputFn}></input>
}