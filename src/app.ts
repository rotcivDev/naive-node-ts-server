import http from "http";
import fs from "fs";

const rawProductdata = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8"
);
const parsedProductData = JSON.parse(rawProductdata);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Home || Overview
  if (pathName === "/" || pathName === "/overview") {
    res.end("listening home or overview");
    return;
  }

  // Product
  if (pathName === "/product") {
    res.end("listening product");
    return;
  }

  // Api
  if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(rawProductdata);
    return;
  }

  // Not found
  res.writeHead(404, {
    "Content-type": "text/html",
  });
  res.end("<h1>Page not found.</h1>");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
