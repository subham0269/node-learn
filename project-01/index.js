const usersData = require('./MOCK_DATA.json');
const express = require('express');
const app = express();
const PORT = 8000;


// Just for testing SSR and returing HTML
app.get('/users', (req, res) => {
  const html = `
  <ul>
    ${usersData.map(user => `<li key=${user.id}>${user.first_name}</li>`).join('')}
  </ul>
  `
  return res.send(html);
})
// --------------------------------------


app.get('/api/users', (req,res) => {
  return res.json(usersData);
});

app.route('/api/users/:id')
.get((req,res) => {
  const userID = req.params.id;
  const user = usersData.find(usr => usr.id === Number(userID));
  return res.json(user);
})
.patch((req, res) => {
  const userID = Number(req.params.id);
  // Todo: Updating a specific user
  return res.json({status: 'Pending'});
})
.delete((req,res) => {
  const userID = Number(req.params.id);
  return res.json({status: 'pending'});
})

app.post('/api/users', (req,res) => {
  // Todo: Create new user
  return res.json({status: 'Pending'})
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))