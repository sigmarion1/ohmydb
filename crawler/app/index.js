const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const getImage = require("./engine");

const getRandomInt = (min, max) => {
  //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
};

const myFunc = async () => {
  const page = getRandomInt(1, 30);
  console.log("current page : " + page);
  await getImage("ohmygirl", page);
  const delay = getRandomInt(1, 24) * 3600 * 1000;
  console.log(`next crawl will start after ${delay} hour`);
  setTimeout(myFunc, delay);
};

setTimeout(myFunc, 1000);
