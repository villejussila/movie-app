const movieSearchRouter = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const BASE_URL = `http://www.omdbapi.com/?`;

movieSearchRouter.get("/", async (req, res) => {
  console.log(req.query.s);
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: req.query.s,
    type: req.query.type || "",
    page: req.query.page || "",
  });
  try {
    const { data } = await axios.get(`${BASE_URL}${params}`);
    res.json(data);
  } catch (err) {
    res.send({ msg: err });
    console.log(err);
  }
});

module.exports = movieSearchRouter;
