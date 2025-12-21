// let a = 'Abhijit'
//  let b =''
// for (i=a.length -1;i>=0;i--){  
//     b +=a[i] 
// }
// console.log(b)


// let c = [2,3,1,2,4,3,5,7,9,4,6,3,9,5]

// let d =[];
// for(i=0;i <= c.length -1 ; i++){
//   console.log(d.includes(c[i]))
// if (!d.includes(c[i])){

//   console.log(c[i])
//     d.push(c[i])
// }
// }
// console.log(d)





let t= [1,2,3,[4,5],[7,8],9]
let r=[]
const arr =(t)=>{
    for (i=0;i<=t.length-1;i++){
        console.log(typeof t)
    if(typeof t == 'object'){
arr(t)
    }else{
        r.push(t)
    }
}
}

arr(t)
console.log(t)