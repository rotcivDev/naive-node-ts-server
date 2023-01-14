import http from "http";

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.end("listening root");
    return;
  }
  if (pathName === "/first-route") {
    res.end("first route");
    return;
  }

  res.writeHead(404, {
    "Content-type": "text/html",
  });
  res.end("<h1>Page not found.</h1>");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
