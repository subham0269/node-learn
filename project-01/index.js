const fs = require('fs');
const express = require('express');
const usersData = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({extended: false}))


// Just for testing SSR and returing HTML
app.get('/users', (req, res) => {
  const html = `
  <ul>
    ${usersData.map(user => `<li key=${user.id}>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>
  `
  return res.send(html)
})
// ---------------------------------------


app.get('/api/users', (req,res) => {
  return res.json(usersData);
});

app.route('/api/users/:id')
  .get((req,res) => {
    const userID = req.params.id;
    const user = usersData.find(usr => usr.id === Number(userID));
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({error: 'User Not Found'});
    }
  })
  .patch((req, res) => {
    const userID = Number(req.params.id);
    const body = req.body;
    const userIndex = usersData.findIndex((i)=> i.id === userID);

    if (userIndex !==-1){
      usersData[userIndex] = {...usersData[userIndex], ...body};
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
        if (err) {
          console.log("error in path /api/users/:id ",err);
          return res.status(500).json({error: 'Internal Server Error'});
        }
        return res.status(200).json({status: 'Updated user successfully'});
      })
    } else {
      return res.status(404).json({error: 'User Not found'});
    }
  })
  .delete((req,res) => {
    const userID = Number(req.params.id) - 1 ;
    if (userID >= 0 && userID < usersData.length) {
      usersData.splice(userID,1);
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
        if (err) {
          console.log("error in path /api/users/:id ",err);
          return res.status(500).json({error: 'Internal Server Error'});
        }
        return res.status(200).json({status: 'Removed user from json'});
      })
    } else {
      return res.status(404).json({error: 'User Not found'});
    }
  })

app.post('/api/users', (req,res) => {
  // Todo: Create new user
  console.log(req.body);
  const body = req.body;
  usersData.push({id: usersData.length + 1, ...body});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
    console.log("error in post /api/users ",err);
    return res.status(201).json({status: 'User created successfully', id: usersData.length});
  })
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))