// Blocking and Non - blocking

const fs = require('fs');

// checking no.of cpus available
const os =require('os'); 
console.log(os.cpus().length)

// Blocking (Sync)
// console.log(1);
// const result = fs.readFileSync('./test.txt','utf-8');
// console.log(result);
// console.log(2);


// Non blocking (Async)
console.log(1);
fs.readFile('./test.txt','utf-8',(err, result) => {
  console.log(result);
});
console.log(2);