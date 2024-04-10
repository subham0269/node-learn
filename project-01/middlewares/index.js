import { promises as fs } from 'fs';

const logReqRes = (filename) => {
  return async (req,res, next) => {
    try {
      await fs.appendFile(filename, `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`);
      // console.log('hello 1st middleware');
    } catch (err) {
      console.error('Error in first middleware', err);
      return res.status(500).json({error: 'Internal Server Error'});
    } finally {
      next();
    }
  }
}

export default logReqRes;