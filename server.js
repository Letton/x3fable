require("dotenv").config();
const http = require("http");
const https = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (process.env.NODE_ENV === "production") {
    const options = {
      key: fs.readFileSync("/etc/letsencrypt/live/letton.tech/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/letton.tech/cert.pem"),
      ca: fs.readFileSync("/etc/letsencrypt/live/letton.tech/chain.pem"),
    };
    https
      .createServer(options, async (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://${hostname}:${port}`);
      });
  } else {
    http
      .createServer(async (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  }
});
