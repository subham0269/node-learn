const fs = require('fs').promises;
const path = require('path');
const express = require('express');
// const usersData = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({extended: false}))

async function loadUsersData () {
  try {
    const data = await fs.readFile(path.join(__dirname, './MOCK_DATA.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading users data. ', err);
    return [];
  }
}

let usersData = [];
loadUsersData().then(data => usersData = data);
console.log(usersData);


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
  .get(async (req,res) => {
    try {
      const userID = req.params.id;
      const user = usersData.find(usr => usr.id === Number(userID));
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({error: 'User Not Found'});
      }
    } catch (err) {
      return res.status(500).json({error: 'Internal Server Error'})
    }
  })
  .patch(async (req, res) => {
    try {
      const userID = Number(req.params.id);
      const body = req.body;
      const userIndex = usersData.findIndex((i)=> i.id === userID);
  
      if (userIndex !==-1){
        usersData[userIndex] = {...usersData[userIndex], ...body};

        await fs.writeFile(path.join(__dirname, './MOCK_DATA.json'), JSON.stringify(usersData));
        return res.status(200).json({status: 'Updated user successfully'});
      } else {
        return res.status(404).json({error: 'User Not found'});
      }
    } catch (err) {
      console.error('Error in PATCH /api/users/:id', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  })
  .delete(async (req,res) => {
    try {
      const userID = Number(req.params.id) - 1 ;
      const userExists = usersData.some(usr => usr.id === userID);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedUsers = usersData.filter(user => user.id !== userID);
      console.log(updatedUsers);
      if (userID >= 0 && userID < usersData.length) {
        await fs.writeFile(path.join(__dirname, './MOCK_DATA.json'), JSON.stringify(usersData));
        return res.status(200).json({ status: 'Removed user from json' });
      } else {
        return res.status(404).json({error: 'User Not found'});
      }
    } catch (err) {
      console.error('Error in DELETE /api/users/:id', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  })

app.post('/api/users', async (req,res) => {
  try {
    const body = req.body;
    usersData.push({id: usersData.length + 1, ...body});
    await fs.writeFile(path.join(__dirname, './MOCK_DATA.json'), JSON.stringify(usersData));
    return res.status(201).json({status: 'User successfully created', id: usersData.length});
  } catch (err) {
    console.error('Error in POST /api/users', err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))