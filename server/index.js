const express = require("express");
const api = require("./routes/api");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", api);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
