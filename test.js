const A = {a:[1]}
const B = {a:[2]}

const C = {
    ...B,
    ...A,
}

for(let key in B){
    if(B.hasOwnProperty(key)){
        if(B[key] !== C[key]){
           if(typeof B[key] === "object"){
              C[key] = C[key].concat(B[key])
           }else{
               C[key] = [C[key],B[key]]
           }
           
        }
    }
}

console.log(JSON.stringify(C))