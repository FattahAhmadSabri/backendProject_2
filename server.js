const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("content-type", "text/html");
    return res.end(`
    <form action="/submit" method="POST">
      <label>Name:</label>
      <input type="text" name="username">
      <input type="submit" value="Add">
    </form>
  `);
  }

  if (req.url === "/submit" && req.method === "POST") {
    res.writeHead(302, {
      Location: "/message",
    });
    return res.end();
  }

  if (req.url === "/message") {
    return res.end(`<h1>Hello from message!</h1>`);
  }

  res.statusCode = 404;
  res.end("Page Not Found");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
