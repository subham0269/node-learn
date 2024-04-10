import { DELETEuserById, GETallUsers, GETuserById, PATCHuserById, POSTnewUser } from "../controllers/user.js";
import express from 'express';

const routes = express.Router();

// Just for testing SSR and returing HTML
// routes.get('/users', async (req, res) => {
//   try {
//     const usersData = await UserModel.find({});
//     const html = `
//     <ul>
//       ${usersData.map(user => `<li key=${user.id}>${user.firstName} ${user.lastName} - ${user.email}</li>`).join('')}
//     </ul>
//     `
//     return res.status(200).send(html);
//   } catch(err) {
//     return res.status(500).json({error: "Internal Server Error"});
//   }
// })
// ---------------------------------------


routes.route('/').get(GETallUsers).post(POSTnewUser);

routes.route('/:id')
  .get(GETuserById)
  .patch(PATCHuserById)
  .delete(DELETEuserById)

export default routes;