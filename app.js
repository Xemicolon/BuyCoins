require("dotenv").config();
const http = require("http");
const { render } = require("./controllers/index");

const hostname = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  render(req, res);
});

server.listen(PORT, hostname, () => {
  console.log("Welcome to BuyCoins Africa");
});
