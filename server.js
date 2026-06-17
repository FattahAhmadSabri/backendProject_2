const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    return res.end(`
        <form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="username">
        <button type="submit">Add</button>
        </form>
    `);
  } else {
    if (req.url === "/message") {
      res.setHeader("content-type", "text/html");
      let body = [];
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });

      req.on("end", () => {
        let buffer = Buffer.concat(body);

        let formData = buffer.toString();
        console.log(formData);
        let formValue = formData.split("=")[1];
        fs.writeFile("formValue.txt", formValue, (err) => {
          console.log(err);
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
    if (req.url === "/read") {
      fs.readFile("formValue.txt", (err, data) => {
        res.end(`<h1>${data.toString()}</h1>`);
      });
    }
   return
  }

  res.statusCode = 404;
  res.end("Page Not Found");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
