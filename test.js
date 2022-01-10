const OBJECT_TYPE = '[object Object]';
const ARRAY_TYPE = '[object Array]';
const getType = (obj) => Object.prototype.toString.call(obj);
const initPath = (data) => {
    if (getType(data) !== OBJECT_TYPE) return;
    for (let item in data) {
        if (/\w+\.\w+/g.test(item) && item.indexOf('[') === -1) {
            const arr = item.split('.');
            let result = data, len = arr.length;
            for (let i = 0; i < len - 1; i++) {
                const arrItem = arr[i];
                if (getType(result[arrItem]) !== OBJECT_TYPE) {
                    result[arrItem] = {};
                }
                result = result[arrItem];
            }
            result[arr[len - 1]] = data[item];
            delete data[item];
        }
    }
};
const initData = (cur, pre, root = false) => {
    if (cur === pre) return;
    const curType = getType(cur), preType = getType(pre);
    if (curType !== preType) return;
    if (curType === ARRAY_TYPE && cur.length >= pre.length) {
        for (let i = 0; i < pre.length; i++) {
            initData(cur[i], pre[i]);
        }
    } else if (curType === OBJECT_TYPE && Object.keys(cur).length >= Object.keys(pre).length) {
        for (let key in pre) {
            if (!root && cur[key] === undefined) { 
                cur[key] = null; 
            } else {
                initData(cur[key], pre[key]);
            }
        }
    }
};
const doDiff = (cur, pre, target, path = '', root = false) => {
    if (cur === pre) return;
    const curRootType = getType(cur), preRootType = getType(pre);
    if (curRootType === ARRAY_TYPE && preRootType === curRootType && cur.length >= pre.length) {
        for (let i = 0; i < cur.length; i++) {
            doDiff(cur[i], pre[i], target, `${path}[${i}]`); 
        }
        return;
    }
    if (curRootType === OBJECT_TYPE && preRootType === curRootType && (root || Object.keys(cur).length >= Object.keys(pre).length)) {
        const keys = Object.keys(cur);
        for (let key of keys) {
            const curVal = cur[key], preVal = pre[key];
            const curType = getType(curVal), preType = getType(preVal);
            if (curVal === preVal) continue;
            if (curType === ARRAY_TYPE && preType === curType && curVal.length >= preVal.length) {
                for (let i = 0; i < curVal.length; i++) {
                    doDiff(curVal[i], preVal[i], target, `${path ? path + '.' : ''}${key}[${i}]`);
                }
                continue;
            }
            if (curType === OBJECT_TYPE && preType === curType && Object.keys(curVal).length >= Object.keys(preVal).length) {
                for (let sKey in curVal) {
                    doDiff(curVal[sKey], preVal[sKey], target, `${path ? path + '.' : ''}${key}.${sKey}`);
                }
                continue;
            }
            target[`${path ? path + '.' : ''}${key}`] = curVal;
        }
        return;
    }
    target[path] = cur;
};

function diff(data, prevData) {
    const target = {};
    initPath(data);
    console.log(data,prevData,target)
    initData(data, prevData, true);
    console.log(data,prevData,target)
    doDiff(data, prevData, target, '', true);
    console.log(data,prevData,target)
    return target;
}

diff({a:[4,5,6],b:2,d:{a:20}},{a:2,b:10,c:30})


const obj = {}
obj['a.b'] = 20
console.log(obj)


// 通过diff 判断新的对象对旧的对象之间做的改变，通过递归判断2个对象是否相等，把新对象的新添加的key-value，或者新对象中原有的key，但value发生改变，把这些改变的部分保存为一个对象，这个对象就是diff的结果，最后再把diff的结果利用原生的 setData 渲染上去。