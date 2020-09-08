const mongoose = require("mongoose");

const mongo_host = process.env.MONGO_HOST || "localhost";
const mongo_user = process.env.MONGO_INITDB_ROOT_USERNAME || "admin";
const mongo_pass = process.env.MONGO_INITDB_ROOT_PASSWORD || "secret123";
const mongo_data = process.env.MONGO_INITDB_DATABASE || "admin";
const mongo_port = process.env.MONGO_PORT || 27017;

mongoose.connect(
  `mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:${mongo_port}/${mongo_data}?authSource=admin&authMechanism=SCRAM-SHA-1`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("db connected!"));
