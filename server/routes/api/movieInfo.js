const movieInfoRouter = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const BASE_URL = `http://www.omdbapi.com/?`;

movieInfoRouter.get("/", async (req, res) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: req.query.i || "",
  });
  try {
    const { data } = await axios.get(`${BASE_URL}${params}`);
    res.json(data);
  } catch (err) {
    res.send({ msg: err });
    console.log(err);
  }
});

module.exports = movieInfoRouter;
