import { useEffect } from "react"
// 页面初始化的时候执行这个hook 
export const useMount = (callback) => {
    useEffect(()=>{
        callback()
    },[])
}
