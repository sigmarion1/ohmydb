const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("./db/mongoose");

const indexRouter = require("./routes/index");

const app = express();
app.use(cors());

app.use(logger(process.env.LOGGER || "common"));
app.use(express.json());
app.use(indexRouter);

const port = process.env.BACK_PORT || 3000;
const host = process.env.BACK_HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Ohmygirl Back-end Server is up on : ${host}:${port}`);
});

// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))
// app.use('/image_db', express.static(path.join(__dirname, '../image_db')))
