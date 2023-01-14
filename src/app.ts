import fs from "fs";
import url from "url";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("coal mine");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
