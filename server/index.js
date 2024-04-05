const fs = require('fs');
const express = require('express');
const app = express();

function addToLog (pathname) {
  fs.appendFile('log.txt', `${Date.now()} : path-${pathname}\n`, () => console.log('Log Created'));
}

app.get('/', (req, res)=>{
  addToLog(req.route.path);
  return res.send('Hey from Home page');
})

app.get('/about', (req,res)=> {
  addToLog(req.route.path);
  return res.send('about page' + req.query.name)
})

app.listen(8000, ()=>console.log('Server started at 8000'));