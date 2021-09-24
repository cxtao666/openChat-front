import React from "react";
export const List = ({list,name}) => {
    return (list.map((item) => {
        return item !== name ? <div key={item}>{item}</div> : ''
    }))
}