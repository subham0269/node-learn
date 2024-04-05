// Creating a file system


const fs = require('fs');
console.log(1);
fs.writeFile('test2.txt', "Subham there", ()=> {
  console.log('first file creation');
});
console.log(2);
fs.writeFile('test3.txt', "Subham there 2", ()=> {
  console.log('second file creation');
});
console.log(3);
fs.unlinkSync('test2.txt');