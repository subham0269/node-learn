import urlModel from "../models/url.js";
import { nanoid } from "nanoid";


export const getAllUrl = async (req,res) => {
  try {
    const data = await urlModel.find({});
    if (!data) return res.status(404).json({error:'404 Not Found'});
    return res.status(200).json(data);
  } catch (Err) {
    return res.status(500).json ({error: 'Internal Server Error', message : Err});
  }
}

export const generateNewShortURL = async (req,res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({error: 'Url is required'});
  console.log(req.body.url);
  const shortID = nanoid(8);
  try {
    await urlModel.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory : [],
      createdBy: req.user._id,
    })
    return res.render('home', {
      id:shortID
    })
  } catch (err) {
    return res.status(500).json ({error: 'Internal Server Error', message : err})
  }
}

export const redirectToUrl = async (req,res) => {
  const shortid = req.params.id;
  if (!shortid) return res.status(400).json({error : 'Id is required'})
  const filter = {shortId : shortid};
  try {
    const updated = await urlModel.findOneAndUpdate(filter, {
      $push : {
        visitHistory : {
          timestamp : Date.now()
        },
      },
    }, {
      returnOriginal: false
    });
    if (!updated) return res.status(404).json({error: '404 not found'})
    return res.redirect(updated.redirectUrl);
  } catch (err) {
    console.log(err);
    return res.status(500).json({error : 'Internal Server Error', message : err})
  }
}

export const getAnalytics = async (req, res) => {
  const s_id = req.params.id;
  if (!s_id) return res.status(400).json({error:'Id is required'})
  try {
    const filter = {shortId : s_id};
    const data = await urlModel.findOne(filter);
    res.status(200).json({total_clicks : data.visitHistory.length, analytics: data.visitHistory});
  } catch (err) {
    return res.status(500).json({error:'Internal Server Error'})
  }
}
