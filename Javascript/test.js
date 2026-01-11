let data =[
{ language: 'JavaScript' }, { language: 'JavaScript' }, { language: 'TypeScript' },
{ language: 'C++' }, { language: 'Java' }, { language: 'Java' }
]
// Output
// [
// {
// language: 'JavaScript', count: 2 }, { language: 'C++', count: 1 }, { language:
// 'TypeScript', count: 1 }, {language: 'Java', count: 2 }
// 	]

// const result = [];

// data.forEach(item => {
//   const index = result.findIndex(
//     obj => obj.language === item.language
//   );

//   if (index !== -1) {
//     result[index].count++;
//   } else {
//     result.push({ language: item.language, count: 1 });
//   }
// });

const result = Object.values(
  data.reduce((a, { language }) => (
    a[language] = a[language] || { language, count: 0 },
    a[language].count++,
    a
  ), {})
);

console.log(result)






clousere write code and explain it  for menomation or some exaple 
vat let const with example 









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





let t = [1, 2, 3, [4, 5], [7, 8], 9];
let r = [];

const arr = (t) => {
  for (let i = 0; i < t.length; i++) {
    if (Array.isArray(t[i])) {
      arr(t[i]); // recurse on inner array
    } else {
      r.push(t[i]);
    }
  }
};

arr(t);
console.log(r);
