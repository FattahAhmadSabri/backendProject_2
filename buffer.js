console.log("buffer");

let arr = [1, 3, 4];

let str1 = "ABCD ";
let str2 = "xyz";
let store1 = Buffer.from(str1);
let store2 = Buffer.from(str2);
console.log(store1);
console.log(store2);
let combined = Buffer.concat([store1, store2]);
console.log(combined.toString());
