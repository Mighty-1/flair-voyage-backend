const http = require("http");
require("dotenv").config;
const connectDB = require("./config/db");

connectDB();

const app = require("./app");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
